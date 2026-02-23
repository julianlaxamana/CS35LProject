import Icon from '../atoms/Icon';
import Spacer from '../atoms/Spacer';

import Search from '../../assets/search.svg';
import Filter from '../../assets/filter.svg';

const SearchBar = ({ placeholder, button_only, on_interact }) => {
  return (
    <div className="search-bar" onClick={button_only ? on_interact : () => {}}>
      <input type="text" placeholder={placeholder} className="search-bar-input" onChange={on_interact} readOnly={button_only} />
      <div className="search-bar-icons" >
        <Icon src={Search} alt="Search" />
        <Icon src={Filter} alt="Filter" />
        <Spacer width={8} />
      </div>
    </div>
  );
}

export default SearchBar;