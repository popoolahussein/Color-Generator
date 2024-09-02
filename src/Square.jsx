import PropTypes from 'prop-types';

const Square = ({ colorValue = "Empty Color Value", hexValue, isDarkText = true }) => {
  return (
    <section
      className='square'
      style={{
        backgroundColor: colorValue,
        color: isDarkText ? "#000" : "#fff"
      }}
    >
      <p className='square-p'>{colorValue ? colorValue : "Empty Value"}</p>
      <p className='square-p'>{hexValue ? hexValue : null}</p>
    </section>
  );
};

Square.propTypes = {
  colorValue: PropTypes.string,
  hexValue: PropTypes.string,
  isDarkText: PropTypes.bool,
};

export default Square;
