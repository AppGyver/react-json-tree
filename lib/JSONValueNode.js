'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

var replaces = {
  'null': null,
  'true': true,
  'false': false,
  undefined: undefined
};

var transformString = function transformString(value) {
  var replaced = replaces.hasOwnProperty(value) ? replaces[value] : value;
  return !isNaN(parseFloat(replaced)) && isFinite(replaced) ? Number(replaced) : replaced;
};

var getString = function getString(_ref) {
  var value = _ref.value,
      nodeType = _ref.nodeType,
      valueGetter = _ref.valueGetter;

  if (nodeType === 'String') {
    return value;
  }
  return valueGetter(value);
};

var JSONValueNode = function (_React$Component) {
  (0, _inherits3['default'])(JSONValueNode, _React$Component);

  function JSONValueNode(props) {
    (0, _classCallCheck3['default'])(this, JSONValueNode);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.keydown = function (e) {
      // Echap, remove edit mode and reset value
      if (e.keyCode === 27) {
        _this.setState({ editing: false, value: getString(_this.props) });
      }

      // If it's not enter, do nothing
      if (e.keyCode !== 13) {
        return;
      }

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          keyPath = _this$props.keyPath;
      var value = _this.state.value;


      onChange({ keyPath: keyPath, value: transformString(value) });
      _this.setState({ editing: false });
    };

    _this.updateValue = function (e) {
      return _this.setState({ value: e.target.value });
    };

    _this.toggleEdit = function () {
      return _this.setState({ editing: !_this.state.editing });
    };

    _this.state = {
      value: getString(props),
      editing: false
    };
    return _this;
  }

  JSONValueNode.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: getString(nextProps)
      });
    }
  };

  JSONValueNode.prototype.render = function render() {
    var _props = this.props,
        nodeType = _props.nodeType,
        styling = _props.styling,
        labelRenderer = _props.labelRenderer,
        keyPath = _props.keyPath,
        valueRenderer = _props.valueRenderer,
        valueGetter = _props.valueGetter,
        editableProperties = _props.editableProperties;
    var _state = this.state,
        value = _state.value,
        editing = _state.editing;

    var parentKeyPath = keyPath.length ? keyPath[keyPath.length - 1] : '';
    var isEditable = keyPath.length ? editableProperties.includes(parentKeyPath) : true;

    return _react2['default'].createElement(
      'li',
      styling('value', nodeType, keyPath),
      _react2['default'].createElement(
        'label',
        styling(['label', 'valueLabel'], nodeType, keyPath),
        labelRenderer(keyPath, nodeType, false, false)
      ),
      editing ? _react2['default'].createElement('input', (0, _extends3['default'])({
        onChange: this.updateValue,
        onKeyDown: this.keydown
      }, styling('valueText', nodeType, keyPath), {
        value: value,
        type: 'text',
        autoFocus: true
      })) : _react2['default'].createElement(
        'span',
        (0, _extends3['default'])({
          onClick: isEditable ? this.toggleEdit : function () {}
        }, styling('valueText', nodeType, keyPath)),
        valueRenderer.apply(undefined, [valueGetter(this.props.value), value].concat(keyPath))
      )
    );
  };

  return JSONValueNode;
}(_react2['default'].Component);

JSONValueNode.propTypes = {
  nodeType: _propTypes2['default'].string.isRequired,
  styling: _propTypes2['default'].func.isRequired,
  labelRenderer: _propTypes2['default'].func.isRequired,
  keyPath: _propTypes2['default'].arrayOf(_propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number])).isRequired,
  valueRenderer: _propTypes2['default'].func.isRequired,
  value: _propTypes2['default'].any,
  valueGetter: _propTypes2['default'].func,
  onChange: _propTypes2['default'].func,
  editableProperties: _propTypes2['default'].array
};
JSONValueNode.defaultProps = {
  valueGetter: function valueGetter(value) {
    return value;
  }
};
exports['default'] = JSONValueNode;