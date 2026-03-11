import React from 'react';

const IngredientsAndAllergensList = ({ ingredients_and_allergens }) => {
  // Gracefully handle empty or undefined data
  if (!ingredients_and_allergens || ingredients_and_allergens.length === 0) {
    return <p>No ingredients listed.</p>;
  }

  const parsed_data = parseIngredientsAndAllergens(ingredients_and_allergens);

  // Recursive render function to handle deep nesting
  const renderList = (data) => {
    return Object.entries(data).map(([key, value], idx) => {
      // If the value is an array, it's a leaf node (e.g., the sub-ingredients or allergens)
      if (Array.isArray(value)) {
        return (
          <li key={idx}>
            <div>{key}</div>
            <ul>
              {value.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </li>
        );
      }
      
      // Rrecurse deeper for objects
      return (
        <li key={idx}>
          <div>{key}</div>
          <ul>{renderList(value)}</ul>
        </li>
      );
    });
  };

  return (
    <ul className="ingredients-allergens-list">
      {renderList(parsed_data)}
    </ul>
  );
};


function parseIngredientsAndAllergens(ingredients_and_allergens) {
  const result = {};

  ingredients_and_allergens.forEach(item => {
    // Reformat all caps to Title Case for better display
    item = item.split(" ").map(word => {
      if (word.toUpperCase() === word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
      }
      return word;
    }).join(" ");

    let main_ingredient = "";
    let detailsStr = "";
    let type = "simple";

    // Detect format: "Main: [ SubItems ]"
    if (item.includes(": [") && item.endsWith("]")) {
      const splitIdx = item.indexOf(": [");
      main_ingredient = item.substring(0, splitIdx).trim();
      detailsStr = item.substring(splitIdx + 3, item.length - 1).trim();
      type = "object";
    } 
    // Detect format: "Main ( SubItems )"
    else if (item.includes("(") && item.endsWith(")")) {
      const splitIdx = item.indexOf("(");
      main_ingredient = item.substring(0, splitIdx).trim();
      detailsStr = item.substring(splitIdx + 1, item.length - 1).trim();
      type = "array";
    } 
    // Fallback for flat strings
    else {
      main_ingredient = item.trim();
    }

    if (type === "object") {
      result[main_ingredient] = {};
      let currentName = "";
      let currentParens = [];
      let currentParenContent = "";
      let depth = 0;

      // Character-by-character scan to respect nested parentheses
      for (let i = 0; i < detailsStr.length; i++) {
        let char = detailsStr[i];
        
        if (char === '(') {
          if (depth > 0) currentParenContent += char;
          depth++;
        } else if (char === ')') {
          depth--;
          if (depth === 0) {
            currentParens.push(currentParenContent.trim());
            currentParenContent = "";
          } else {
            currentParenContent += char;
          }
        } else if (char === ',' && depth === 0) {
          // Top-level comma: commit the current sub-ingredient
          commitSubIngredient(currentName, currentParens, result[main_ingredient]);
          currentName = "";
          currentParens = [];
        } else {
          if (depth === 0) {
            currentName += char;
          } else {
            currentParenContent += char;
          }
        }
      }
      // Commit the final sub-ingredient in the loop
      commitSubIngredient(currentName, currentParens, result[main_ingredient]);
      
    } else if (type === "array") {
      // Just a direct array mapping for "Whipped Topping" style entries
      result[main_ingredient] = splitIngredientString(detailsStr);
    } else {
      result[main_ingredient] = [];
    }
  });

  return result;
}

// Helper to assemble the nested object data
function commitSubIngredient(name, parens, targetObj) {
  name = name.trim();
  if (!name) return;
  
  let values = [];
  parens.forEach(p => {
    values.push(...splitIngredientString(p));
  });
  
  targetObj[name] = values;
}

// Smart string splitter with heuristics for complex FDA phrasing
function splitIngredientString(str) {
  str = str.trim();
  
  // Heuristic 1: If it's a full raw ingredient block, don't split it.
  if (str.toUpperCase().startsWith("INGREDIENTS:")) {
    return [str];
  }

  const result = [];
  let current = "";
  let depth = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '(') depth++;
    else if (char === ')') depth--;

    if (char === ',' && depth === 0) {
      const remainder = str.substring(i + 1).trim();
      
      // Heuristic 2: If the remainder starts with standard FDA grouping language, 
      // group the entire remainder as a single string and stop splitting.
      if (remainder.toUpperCase().startsWith("CONTAINS LESS THAN") || 
          remainder.toUpperCase().startsWith("CONTAINS:")) {
        result.push(current.trim());
        result.push(remainder);
        return result;
      }
      
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  
  if (current) result.push(current.trim());
  return result;
}

export default IngredientsAndAllergensList;
