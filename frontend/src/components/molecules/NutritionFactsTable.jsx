const FIRST_IN_GROUP_NUTRIENTS = ["Total Fat", "Cholesterol", "Total Carbohydrate", "Protein", "Vitamin A"];

const NutritionFactsTable = ({ nutrition_facts }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nutrient</th>
          <th>Amount</th>
          <th>DV</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(nutrition_facts).filter(([key, value]) => value !== null && value !== undefined).map(([key, value]) => ProcessNutritionRow(key, value))}
      </tbody>
    </table>
  );
}

// Assumed structure of nutrition_facts:
// key: string value
// key: { subkey1: string value, subkey2: string value } <-- first is amount, second is daily value
function ProcessNutritionRow (key, value, first_in_group = false) {
  if (typeof value === 'object' && value !== null) {
    // Nested object, process each sub-key
    return <TableRow label={key} amount={value["Amount"]} daily_value={value["Daily Value"]} first_in_group={FIRST_IN_GROUP_NUTRIENTS.includes(key)} />;
  }
  return <TableRow label={key} amount={value} first_in_group={FIRST_IN_GROUP_NUTRIENTS.includes(key)} />;
}

const TableRow = ({ label, amount, daily_value, first_in_group = false }) => {
  return (
    <tr className={first_in_group ? "first-in-group" : ""}>
      <td>{label}</td>
      <td>{amount}</td>
      {daily_value && <td>{daily_value}</td>}
    </tr>
  )
}

export default NutritionFactsTable;