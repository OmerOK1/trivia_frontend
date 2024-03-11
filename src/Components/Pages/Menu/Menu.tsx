import './Menu.css';
import CustomLink from '../../Utils/CustomLink/CustomLink';

function Menu(): JSX.Element {
  return (
    <div className="menu">
      <CustomLink to="/demosettings">Classic Game</CustomLink>
      <CustomLink to="/survivalsettings">Survival</CustomLink>
      <CustomLink to="/timetrialsettings">Time Trial</CustomLink>
      <CustomLink to="/multiplayersettings">Multiplayer</CustomLink>
      {/* <CustomLink to="/signin">Sign in</CustomLink>
      <CustomLink to="/signup">Sign up</CustomLink> */}
    </div>
  );
};


export default Menu;
