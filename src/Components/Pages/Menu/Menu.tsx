import './Menu.css';
import { useNavigate } from 'react-router-dom';
import CustomLink from '../../Utils/CustomLink/CustomLink';

function Menu(): JSX.Element {
  const navigation = useNavigate();
  return (
    <div className="menu">
      <CustomLink to="/demosettings">Single player</CustomLink>
      <CustomLink to="/multiplayersettings">Host game</CustomLink>
      <CustomLink to="/joingame">Join game</CustomLink>
      <CustomLink to="/signin">Sign in</CustomLink>
      <CustomLink to="/signup">Sign up</CustomLink>
    </div>
  );
};


export default Menu;
