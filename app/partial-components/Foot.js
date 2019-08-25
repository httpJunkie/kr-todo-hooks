import React, { useContext } from 'react';
import { AppContext } from "../context/AppContext";
import { Switch as ThemeSwitch } from '@progress/kendo-react-inputs';
import { getCurrentDate } from '../utils/date';

const Foot = () => {
  const context = useContext(AppContext);
  const isLight = context.themeMode === 'light';
  const nextThemeMode = isLight ? 'dark' : 'light';
  const currentDate = getCurrentDate('year', '');

  const handleThemeChange = () => {
    context.changeTheme(nextThemeMode);
    context.setScreenAnnoncement(`Site theme set to ${nextThemeMode}`);
  }
  
  return (
    <div className="foot">
      The Todo Company &copy; {currentDate} &nbsp; | &nbsp;
      <ThemeSwitch 
        onChange={handleThemeChange} 
        checked={isLight} 
        onLabel={"enable light theme"} 
        offLabel={"enable dark theme"}
      /> &nbsp; <span>{context.themeMode}</span>
    </div>
  );
}

export default Foot;