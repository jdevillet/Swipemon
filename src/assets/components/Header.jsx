import title from "../img/SwiP-mon-2-13-2026.png";

const Header = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <img src={title} alt="SwiPémon" className="max-h-24 md:max-h-32" />
    </div>
  );
};

export default Header;
