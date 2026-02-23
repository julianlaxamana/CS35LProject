import { useState } from 'react';

const Slider = ({ 
  // Actual bounds of the slider
  min = 0, 
  max = 100, 
  // Step size for the slider
  step = 1, 
  // Default values for the first and second thumbs (if has_two_thumbs is true, otherwise default_value_first is kept constant)
  default_value_first = 0, 
  default_value_second = 0, 
  // Callback function to handle changes in the slider values
  on_change = (first, second) => {},
  // Whether the slider has one thumb (for single value) or two thumbs (for range selection)
  has_two_thumbs = false 
}) => {
  const [first_val, setFirstVal] = useState(has_two_thumbs ? default_value_first : min);
  const [second_val, setSecondVal] = useState(default_value_second);

  const handleFirstChange = (e) => {
    // Prevent the first thumb from crossing over the second thumb
    const value = Math.min(Number(e.target.value), has_two_thumbs ? second_val - step : max);
    setFirstVal(value);
    on_change(value, second_val);
  }

  const handleSecondChange = (e) => {
    // Prevent the second thumb from crossing over the first thumb, allow if has_two_thumbs is false (single thumb mode)
    const value = Math.max(Number(e.target.value), has_two_thumbs ? first_val + step : min);
    setSecondVal(value);
    on_change(first_val, value);
  }

  const first_percent = ((first_val - min) / (max - min)) * 100;
  const second_percent = ((second_val - min) / (max - min)) * 100;

  // Determine the number of decimal places to show in the labels based on the step size
  const decimal_places = step.toString().includes('.') ? step.toString().split('.')[1].length : 0;

  return (
    <div className="slider-container">
      <span className="slider-label">{first_val.toFixed(decimal_places)}</span>
      <div className="slider-main">
        {/* Render the track background and active track */}
        <div className="slider-track-bg"></div>
        <div 
          className="slider-track-active" 
          style={{ left: `${first_percent}%`, right: `${100 - second_percent}%` }}
        ></div>
        
        {/* Render the first thumb only if both ends are adjustable */}
        {has_two_thumbs && (
          <input 
            type="range" 
            min={min} 
            max={max} 
            step={step} 
            value={first_val} 
          onChange={handleFirstChange} 
          className="slider-input" 
        />)}

        {/* Render the second thumb (always rendered) */}
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={second_val} 
          onChange={handleSecondChange} 
          className="slider-input" 
        />
      </div>
      <span className="slider-label">{second_val.toFixed(decimal_places)}</span>
    </div>
  )
}

export default Slider;