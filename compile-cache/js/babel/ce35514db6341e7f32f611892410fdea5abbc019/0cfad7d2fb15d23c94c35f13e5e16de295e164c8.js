'use babel';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var changeCase = require('change-case');
var selectList = undefined;

var _require = require('atom');

var BufferedProcess = _require.BufferedProcess;

var _require2 = require('./operator');

var Operator = _require2.Operator;

// TransformString
// ================================

var TransformString = (function (_Operator) {
  _inherits(TransformString, _Operator);

  function TransformString() {
    _classCallCheck(this, TransformString);

    _get(Object.getPrototypeOf(TransformString.prototype), 'constructor', this).apply(this, arguments);

    this.trackChange = true;
    this.stayOptionName = 'stayOnTransformString';
    this.autoIndent = false;
    this.autoIndentNewline = false;
    this.replaceByDiff = false;
  }

  _createClass(TransformString, [{
    key: 'mutateSelection',
    value: function mutateSelection(selection) {
      var text = this.getNewText(selection.getText(), selection);
      if (text) {
        if (this.replaceByDiff) {
          this.replaceTextInRangeViaDiff(selection.getBufferRange(), text);
        } else {
          selection.insertText(text, { autoIndent: this.autoIndent, autoIndentNewline: this.autoIndentNewline });
        }
      }
    }
  }], [{
    key: 'registerToSelectList',
    value: function registerToSelectList() {
      this.stringTransformers.push(this);
    }
  }, {
    key: 'command',
    value: false,
    enumerable: true
  }, {
    key: 'stringTransformers',
    value: [],
    enumerable: true
  }]);

  return TransformString;
})(Operator);

var ChangeCase = (function (_TransformString) {
  _inherits(ChangeCase, _TransformString);

  function ChangeCase() {
    _classCallCheck(this, ChangeCase);

    _get(Object.getPrototypeOf(ChangeCase.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ChangeCase, [{
    key: 'getNewText',
    value: function getNewText(text) {
      var functionName = this.functionName || changeCase.lowerCaseFirst(this.name);
      // HACK: Pure Vim's `~` is too aggressive(e.g. remove punctuation, remove white spaces...).
      // Here intentionally making changeCase less aggressive by narrowing target charset.
      var charset = '[À-ʯΆ-և\\w]';
      var regex = new RegExp(charset + '+(:?[-./]?' + charset + '+)*', 'g');
      return text.replace(regex, function (match) {
        return changeCase[functionName](match);
      });
    }
  }], [{
    key: 'command',
    value: false,
    enumerable: true
  }]);

  return ChangeCase;
})(TransformString);

var NoCase = (function (_ChangeCase) {
  _inherits(NoCase, _ChangeCase);

  function NoCase() {
    _classCallCheck(this, NoCase);

    _get(Object.getPrototypeOf(NoCase.prototype), 'constructor', this).apply(this, arguments);
  }

  return NoCase;
})(ChangeCase);

var DotCase = (function (_ChangeCase2) {
  _inherits(DotCase, _ChangeCase2);

  function DotCase() {
    _classCallCheck(this, DotCase);

    _get(Object.getPrototypeOf(DotCase.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DotCase, null, [{
    key: 'displayNameSuffix',
    value: '.',
    enumerable: true
  }]);

  return DotCase;
})(ChangeCase);

var SwapCase = (function (_ChangeCase3) {
  _inherits(SwapCase, _ChangeCase3);

  function SwapCase() {
    _classCallCheck(this, SwapCase);

    _get(Object.getPrototypeOf(SwapCase.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SwapCase, null, [{
    key: 'displayNameSuffix',
    value: '~',
    enumerable: true
  }]);

  return SwapCase;
})(ChangeCase);

var PathCase = (function (_ChangeCase4) {
  _inherits(PathCase, _ChangeCase4);

  function PathCase() {
    _classCallCheck(this, PathCase);

    _get(Object.getPrototypeOf(PathCase.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(PathCase, null, [{
    key: 'displayNameSuffix',
    value: '/',
    enumerable: true
  }]);

  return PathCase;
})(ChangeCase);

var UpperCase = (function (_ChangeCase5) {
  _inherits(UpperCase, _ChangeCase5);

  function UpperCase() {
    _classCallCheck(this, UpperCase);

    _get(Object.getPrototypeOf(UpperCase.prototype), 'constructor', this).apply(this, arguments);
  }

  return UpperCase;
})(ChangeCase);

var LowerCase = (function (_ChangeCase6) {
  _inherits(LowerCase, _ChangeCase6);

  function LowerCase() {
    _classCallCheck(this, LowerCase);

    _get(Object.getPrototypeOf(LowerCase.prototype), 'constructor', this).apply(this, arguments);
  }

  return LowerCase;
})(ChangeCase);

var CamelCase = (function (_ChangeCase7) {
  _inherits(CamelCase, _ChangeCase7);

  function CamelCase() {
    _classCallCheck(this, CamelCase);

    _get(Object.getPrototypeOf(CamelCase.prototype), 'constructor', this).apply(this, arguments);
  }

  return CamelCase;
})(ChangeCase);

var SnakeCase = (function (_ChangeCase8) {
  _inherits(SnakeCase, _ChangeCase8);

  function SnakeCase() {
    _classCallCheck(this, SnakeCase);

    _get(Object.getPrototypeOf(SnakeCase.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SnakeCase, null, [{
    key: 'displayNameSuffix',
    value: '_',
    enumerable: true
  }]);

  return SnakeCase;
})(ChangeCase);

var TitleCase = (function (_ChangeCase9) {
  _inherits(TitleCase, _ChangeCase9);

  function TitleCase() {
    _classCallCheck(this, TitleCase);

    _get(Object.getPrototypeOf(TitleCase.prototype), 'constructor', this).apply(this, arguments);
  }

  return TitleCase;
})(ChangeCase);

var ParamCase = (function (_ChangeCase10) {
  _inherits(ParamCase, _ChangeCase10);

  function ParamCase() {
    _classCallCheck(this, ParamCase);

    _get(Object.getPrototypeOf(ParamCase.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ParamCase, null, [{
    key: 'displayNameSuffix',
    value: '-',
    enumerable: true
  }]);

  return ParamCase;
})(ChangeCase);

var HeaderCase = (function (_ChangeCase11) {
  _inherits(HeaderCase, _ChangeCase11);

  function HeaderCase() {
    _classCallCheck(this, HeaderCase);

    _get(Object.getPrototypeOf(HeaderCase.prototype), 'constructor', this).apply(this, arguments);
  }

  return HeaderCase;
})(ChangeCase);

var PascalCase = (function (_ChangeCase12) {
  _inherits(PascalCase, _ChangeCase12);

  function PascalCase() {
    _classCallCheck(this, PascalCase);

    _get(Object.getPrototypeOf(PascalCase.prototype), 'constructor', this).apply(this, arguments);
  }

  return PascalCase;
})(ChangeCase);

var ConstantCase = (function (_ChangeCase13) {
  _inherits(ConstantCase, _ChangeCase13);

  function ConstantCase() {
    _classCallCheck(this, ConstantCase);

    _get(Object.getPrototypeOf(ConstantCase.prototype), 'constructor', this).apply(this, arguments);
  }

  return ConstantCase;
})(ChangeCase);

var SentenceCase = (function (_ChangeCase14) {
  _inherits(SentenceCase, _ChangeCase14);

  function SentenceCase() {
    _classCallCheck(this, SentenceCase);

    _get(Object.getPrototypeOf(SentenceCase.prototype), 'constructor', this).apply(this, arguments);
  }

  return SentenceCase;
})(ChangeCase);

var UpperCaseFirst = (function (_ChangeCase15) {
  _inherits(UpperCaseFirst, _ChangeCase15);

  function UpperCaseFirst() {
    _classCallCheck(this, UpperCaseFirst);

    _get(Object.getPrototypeOf(UpperCaseFirst.prototype), 'constructor', this).apply(this, arguments);
  }

  return UpperCaseFirst;
})(ChangeCase);

var LowerCaseFirst = (function (_ChangeCase16) {
  _inherits(LowerCaseFirst, _ChangeCase16);

  function LowerCaseFirst() {
    _classCallCheck(this, LowerCaseFirst);

    _get(Object.getPrototypeOf(LowerCaseFirst.prototype), 'constructor', this).apply(this, arguments);
  }

  return LowerCaseFirst;
})(ChangeCase);

var DashCase = (function (_ChangeCase17) {
  _inherits(DashCase, _ChangeCase17);

  function DashCase() {
    _classCallCheck(this, DashCase);

    _get(Object.getPrototypeOf(DashCase.prototype), 'constructor', this).apply(this, arguments);

    this.functionName = 'paramCase';
  }

  _createClass(DashCase, null, [{
    key: 'displayNameSuffix',
    value: '-',
    enumerable: true
  }]);

  return DashCase;
})(ChangeCase);

var ToggleCase = (function (_ChangeCase18) {
  _inherits(ToggleCase, _ChangeCase18);

  function ToggleCase() {
    _classCallCheck(this, ToggleCase);

    _get(Object.getPrototypeOf(ToggleCase.prototype), 'constructor', this).apply(this, arguments);

    this.functionName = 'swapCase';
  }

  _createClass(ToggleCase, null, [{
    key: 'displayNameSuffix',
    value: '~',
    enumerable: true
  }]);

  return ToggleCase;
})(ChangeCase);

var ToggleCaseAndMoveRight = (function (_ChangeCase19) {
  _inherits(ToggleCaseAndMoveRight, _ChangeCase19);

  function ToggleCaseAndMoveRight() {
    _classCallCheck(this, ToggleCaseAndMoveRight);

    _get(Object.getPrototypeOf(ToggleCaseAndMoveRight.prototype), 'constructor', this).apply(this, arguments);

    this.functionName = 'swapCase';
    this.flashTarget = false;
    this.restorePositions = false;
    this.target = 'MoveRight';
  }

  // Replace
  // -------------------------
  return ToggleCaseAndMoveRight;
})(ChangeCase);

var Replace = (function (_TransformString2) {
  _inherits(Replace, _TransformString2);

  function Replace() {
    _classCallCheck(this, Replace);

    _get(Object.getPrototypeOf(Replace.prototype), 'constructor', this).apply(this, arguments);

    this.flashCheckpoint = 'did-select-occurrence';
    this.autoIndentNewline = true;
    this.readInputAfterSelect = true;
  }

  _createClass(Replace, [{
    key: 'getNewText',
    value: function getNewText(text) {
      if (this.target.name === 'MoveRightBufferColumn' && text.length !== this.getCount()) {
        return;
      }

      var input = this.input || '\n';
      if (input === '\n') {
        this.restorePositions = false;
      }
      return text.replace(/./g, input);
    }
  }]);

  return Replace;
})(TransformString);

var ReplaceCharacter = (function (_Replace) {
  _inherits(ReplaceCharacter, _Replace);

  function ReplaceCharacter() {
    _classCallCheck(this, ReplaceCharacter);

    _get(Object.getPrototypeOf(ReplaceCharacter.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'MoveRightBufferColumn';
  }

  // -------------------------
  // DUP meaning with SplitString need consolidate.
  return ReplaceCharacter;
})(Replace);

var SplitByCharacter = (function (_TransformString3) {
  _inherits(SplitByCharacter, _TransformString3);

  function SplitByCharacter() {
    _classCallCheck(this, SplitByCharacter);

    _get(Object.getPrototypeOf(SplitByCharacter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SplitByCharacter, [{
    key: 'getNewText',
    value: function getNewText(text) {
      return text.split('').join(' ');
    }
  }]);

  return SplitByCharacter;
})(TransformString);

var EncodeUriComponent = (function (_TransformString4) {
  _inherits(EncodeUriComponent, _TransformString4);

  function EncodeUriComponent() {
    _classCallCheck(this, EncodeUriComponent);

    _get(Object.getPrototypeOf(EncodeUriComponent.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(EncodeUriComponent, [{
    key: 'getNewText',
    value: function getNewText(text) {
      return encodeURIComponent(text);
    }
  }], [{
    key: 'displayNameSuffix',
    value: '%',
    enumerable: true
  }]);

  return EncodeUriComponent;
})(TransformString);

var DecodeUriComponent = (function (_TransformString5) {
  _inherits(DecodeUriComponent, _TransformString5);

  function DecodeUriComponent() {
    _classCallCheck(this, DecodeUriComponent);

    _get(Object.getPrototypeOf(DecodeUriComponent.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DecodeUriComponent, [{
    key: 'getNewText',
    value: function getNewText(text) {
      return decodeURIComponent(text);
    }
  }], [{
    key: 'displayNameSuffix',
    value: '%%',
    enumerable: true
  }]);

  return DecodeUriComponent;
})(TransformString);

var TrimString = (function (_TransformString6) {
  _inherits(TrimString, _TransformString6);

  function TrimString() {
    _classCallCheck(this, TrimString);

    _get(Object.getPrototypeOf(TrimString.prototype), 'constructor', this).apply(this, arguments);

    this.stayByMarker = true;
    this.replaceByDiff = true;
  }

  _createClass(TrimString, [{
    key: 'getNewText',
    value: function getNewText(text) {
      return text.trim();
    }
  }]);

  return TrimString;
})(TransformString);

var CompactSpaces = (function (_TransformString7) {
  _inherits(CompactSpaces, _TransformString7);

  function CompactSpaces() {
    _classCallCheck(this, CompactSpaces);

    _get(Object.getPrototypeOf(CompactSpaces.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(CompactSpaces, [{
    key: 'getNewText',
    value: function getNewText(text) {
      if (text.match(/^[ ]+$/)) {
        return ' ';
      } else {
        // Don't compact for leading and trailing white spaces.
        var regex = /^(\s*)(.*?)(\s*)$/gm;
        return text.replace(regex, function (m, leading, middle, trailing) {
          return leading + middle.split(/[ \t]+/).join(' ') + trailing;
        });
      }
    }
  }]);

  return CompactSpaces;
})(TransformString);

var AlignOccurrence = (function (_TransformString8) {
  _inherits(AlignOccurrence, _TransformString8);

  function AlignOccurrence() {
    _classCallCheck(this, AlignOccurrence);

    _get(Object.getPrototypeOf(AlignOccurrence.prototype), 'constructor', this).apply(this, arguments);

    this.occurrence = true;
    this.whichToPad = 'auto';
  }

  _createClass(AlignOccurrence, [{
    key: 'getSelectionTaker',
    value: function getSelectionTaker() {
      var selectionsByRow = {};
      for (var selection of this.editor.getSelectionsOrderedByBufferPosition()) {
        var row = selection.getBufferRange().start.row;
        if (!(row in selectionsByRow)) selectionsByRow[row] = [];
        selectionsByRow[row].push(selection);
      }
      var allRows = Object.keys(selectionsByRow);
      return function () {
        return allRows.map(function (row) {
          return selectionsByRow[row].shift();
        }).filter(function (s) {
          return s;
        });
      };
    }
  }, {
    key: 'getWichToPadForText',
    value: function getWichToPadForText(text) {
      if (this.whichToPad !== 'auto') return this.whichToPad;

      if (/^\s*[=|]\s*$/.test(text)) {
        // Asignment(=) and `|`(markdown-table separator)
        return 'start';
      } else if (/^\s*,\s*$/.test(text)) {
        // Arguments
        return 'end';
      } else if (/\W$/.test(text)) {
        // ends with non-word-char
        return 'end';
      } else {
        return 'start';
      }
    }
  }, {
    key: 'calculatePadding',
    value: function calculatePadding() {
      var _this = this;

      var totalAmountOfPaddingByRow = {};
      var columnForSelection = function columnForSelection(selection) {
        var which = _this.getWichToPadForText(selection.getText());
        var point = selection.getBufferRange()[which];
        return point.column + (totalAmountOfPaddingByRow[point.row] || 0);
      };

      var takeSelections = this.getSelectionTaker();
      while (true) {
        var selections = takeSelections();
        if (!selections.length) return;
        var maxColumn = selections.map(columnForSelection).reduce(function (max, cur) {
          return cur > max ? cur : max;
        });
        for (var selection of selections) {
          var row = selection.getBufferRange().start.row;
          var amountOfPadding = maxColumn - columnForSelection(selection);
          totalAmountOfPaddingByRow[row] = (totalAmountOfPaddingByRow[row] || 0) + amountOfPadding;
          this.amountOfPaddingBySelection.set(selection, amountOfPadding);
        }
      }
    }
  }, {
    key: 'execute',
    value: function execute() {
      var _this2 = this;

      this.amountOfPaddingBySelection = new Map();
      this.onDidSelectTarget(function () {
        _this2.calculatePadding();
      });
      _get(Object.getPrototypeOf(AlignOccurrence.prototype), 'execute', this).call(this);
    }
  }, {
    key: 'getNewText',
    value: function getNewText(text, selection) {
      var padding = ' '.repeat(this.amountOfPaddingBySelection.get(selection));
      var whichToPad = this.getWichToPadForText(selection.getText());
      return whichToPad === 'start' ? padding + text : text + padding;
    }
  }]);

  return AlignOccurrence;
})(TransformString);

var AlignOccurrenceByPadLeft = (function (_AlignOccurrence) {
  _inherits(AlignOccurrenceByPadLeft, _AlignOccurrence);

  function AlignOccurrenceByPadLeft() {
    _classCallCheck(this, AlignOccurrenceByPadLeft);

    _get(Object.getPrototypeOf(AlignOccurrenceByPadLeft.prototype), 'constructor', this).apply(this, arguments);

    this.whichToPad = 'start';
  }

  return AlignOccurrenceByPadLeft;
})(AlignOccurrence);

var AlignOccurrenceByPadRight = (function (_AlignOccurrence2) {
  _inherits(AlignOccurrenceByPadRight, _AlignOccurrence2);

  function AlignOccurrenceByPadRight() {
    _classCallCheck(this, AlignOccurrenceByPadRight);

    _get(Object.getPrototypeOf(AlignOccurrenceByPadRight.prototype), 'constructor', this).apply(this, arguments);

    this.whichToPad = 'end';
  }

  return AlignOccurrenceByPadRight;
})(AlignOccurrence);

var RemoveLeadingWhiteSpaces = (function (_TransformString9) {
  _inherits(RemoveLeadingWhiteSpaces, _TransformString9);

  function RemoveLeadingWhiteSpaces() {
    _classCallCheck(this, RemoveLeadingWhiteSpaces);

    _get(Object.getPrototypeOf(RemoveLeadingWhiteSpaces.prototype), 'constructor', this).apply(this, arguments);

    this.wise = 'linewise';
  }

  _createClass(RemoveLeadingWhiteSpaces, [{
    key: 'getNewText',
    value: function getNewText(text, selection) {
      var trimLeft = function trimLeft(text) {
        return text.trimLeft();
      };
      return this.utils.splitTextByNewLine(text).map(trimLeft).join('\n') + '\n';
    }
  }]);

  return RemoveLeadingWhiteSpaces;
})(TransformString);

var ConvertToSoftTab = (function (_TransformString10) {
  _inherits(ConvertToSoftTab, _TransformString10);

  function ConvertToSoftTab() {
    _classCallCheck(this, ConvertToSoftTab);

    _get(Object.getPrototypeOf(ConvertToSoftTab.prototype), 'constructor', this).apply(this, arguments);

    this.wise = 'linewise';
  }

  _createClass(ConvertToSoftTab, [{
    key: 'mutateSelection',
    value: function mutateSelection(selection) {
      var _this3 = this;

      this.scanEditor('forward', /\t/g, { scanRange: selection.getBufferRange() }, function (_ref) {
        var range = _ref.range;
        var replace = _ref.replace;

        // Replace \t to spaces which length is vary depending on tabStop and tabLenght
        // So we directly consult it's screen representing length.
        var length = _this3.editor.screenRangeForBufferRange(range).getExtent().column;
        replace(' '.repeat(length));
      });
    }
  }], [{
    key: 'displayName',
    value: 'Soft Tab',
    enumerable: true
  }]);

  return ConvertToSoftTab;
})(TransformString);

var ConvertToHardTab = (function (_TransformString11) {
  _inherits(ConvertToHardTab, _TransformString11);

  function ConvertToHardTab() {
    _classCallCheck(this, ConvertToHardTab);

    _get(Object.getPrototypeOf(ConvertToHardTab.prototype), 'constructor', this).apply(this, arguments);
  }

  // -------------------------

  _createClass(ConvertToHardTab, [{
    key: 'mutateSelection',
    value: function mutateSelection(selection) {
      var _this4 = this;

      var tabLength = this.editor.getTabLength();
      this.scanEditor('forward', /[ \t]+/g, { scanRange: selection.getBufferRange() }, function (_ref2) {
        var range = _ref2.range;
        var replace = _ref2.replace;

        var _editor$screenRangeForBufferRange = _this4.editor.screenRangeForBufferRange(range);

        var start = _editor$screenRangeForBufferRange.start;
        var end = _editor$screenRangeForBufferRange.end;

        var startColumn = start.column;
        var endColumn = end.column;

        // We can't naively replace spaces to tab, we have to consider valid tabStop column
        // If nextTabStop column exceeds replacable range, we pad with spaces.
        var newText = '';
        while (true) {
          var remainder = startColumn % tabLength;
          var nextTabStop = startColumn + (remainder === 0 ? tabLength : remainder);
          if (nextTabStop > endColumn) {
            newText += ' '.repeat(endColumn - startColumn);
          } else {
            newText += '\t';
          }
          startColumn = nextTabStop;
          if (startColumn >= endColumn) {
            break;
          }
        }

        replace(newText);
      });
    }
  }], [{
    key: 'displayName',
    value: 'Hard Tab',
    enumerable: true
  }]);

  return ConvertToHardTab;
})(TransformString);

var TransformStringByExternalCommand = (function (_TransformString12) {
  _inherits(TransformStringByExternalCommand, _TransformString12);

  function TransformStringByExternalCommand() {
    _classCallCheck(this, TransformStringByExternalCommand);

    _get(Object.getPrototypeOf(TransformStringByExternalCommand.prototype), 'constructor', this).apply(this, arguments);

    this.autoIndent = true;
    this.command = '';
    this.args = [];
  }

  // -------------------------

  _createClass(TransformStringByExternalCommand, [{
    key: 'getNewText',
    // e.g args: ['-rn']

    // NOTE: Unlike other class, first arg is `stdout` of external commands.
    value: function getNewText(text, selection) {
      return text || selection.getText();
    }
  }, {
    key: 'getCommand',
    value: function getCommand(selection) {
      return { command: this.command, args: this.args };
    }
  }, {
    key: 'getStdin',
    value: function getStdin(selection) {
      return selection.getText();
    }
  }, {
    key: 'execute',
    value: _asyncToGenerator(function* () {
      this.preSelect();

      if (this.selectTarget()) {
        for (var selection of this.editor.getSelections()) {
          var _ref3 = this.getCommand(selection) || {};

          var command = _ref3.command;
          var args = _ref3.args;

          if (command == null || args == null) continue;

          var stdout = yield this.runExternalCommand({ command: command, args: args, stdin: this.getStdin(selection) });
          selection.insertText(this.getNewText(stdout, selection), { autoIndent: this.autoIndent });
        }
        this.mutationManager.setCheckpoint('did-finish');
        this.restoreCursorPositionsIfNecessary();
      }
      this.postMutate();
    })
  }, {
    key: 'runExternalCommand',
    value: function runExternalCommand(options) {
      var _this5 = this;

      var output = '';
      options.stdout = function (data) {
        return output += data;
      };
      var exitPromise = new Promise(function (resolve) {
        options.exit = function () {
          return resolve(output);
        };
      });
      var stdin = options.stdin;

      delete options.stdin;
      var bufferedProcess = new BufferedProcess(options);
      bufferedProcess.onWillThrowError(function (_ref4) {
        var error = _ref4.error;
        var handle = _ref4.handle;

        // Suppress command not found error intentionally.
        if (error.code === 'ENOENT' && error.syscall.indexOf('spawn') === 0) {
          console.log(_this5.getCommandName() + ': Failed to spawn command ' + error.path + '.');
          handle();
        }
        _this5.cancelOperation();
      });

      if (stdin) {
        bufferedProcess.process.stdin.write(stdin);
        bufferedProcess.process.stdin.end();
      }
      return exitPromise;
    }
  }], [{
    key: 'command',
    value: false,
    enumerable: true
  }]);

  return TransformStringByExternalCommand;
})(TransformString);

var TransformStringBySelectList = (function (_TransformString13) {
  _inherits(TransformStringBySelectList, _TransformString13);

  function TransformStringBySelectList() {
    _classCallCheck(this, TransformStringBySelectList);

    _get(Object.getPrototypeOf(TransformStringBySelectList.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'Empty';
    this.recordable = false;
  }

  _createClass(TransformStringBySelectList, [{
    key: 'selectItems',
    value: function selectItems() {
      if (!selectList) {
        var SelectList = require('./select-list');
        selectList = new SelectList();
      }
      return selectList.selectFromItems(this.constructor.getSelectListItems());
    }
  }, {
    key: 'execute',
    value: _asyncToGenerator(function* () {
      var item = yield this.selectItems();
      if (item) {
        this.vimState.operationStack.runNext(item.klass, { target: this.nextTarget });
      }
    })
  }], [{
    key: 'getSelectListItems',
    value: function getSelectListItems() {
      var _this6 = this;

      if (!this.selectListItems) {
        this.selectListItems = this.stringTransformers.map(function (klass) {
          var suffix = klass.hasOwnProperty('displayNameSuffix') ? ' ' + klass.displayNameSuffix : '';

          return {
            klass: klass,
            displayName: klass.hasOwnProperty('displayName') ? klass.displayName + suffix : _this6._.humanizeEventName(_this6._.dasherize(klass.name)) + suffix
          };
        });
      }
      return this.selectListItems;
    }
  }]);

  return TransformStringBySelectList;
})(TransformString);

var TransformWordBySelectList = (function (_TransformStringBySelectList) {
  _inherits(TransformWordBySelectList, _TransformStringBySelectList);

  function TransformWordBySelectList() {
    _classCallCheck(this, TransformWordBySelectList);

    _get(Object.getPrototypeOf(TransformWordBySelectList.prototype), 'constructor', this).apply(this, arguments);

    this.nextTarget = 'InnerWord';
  }

  return TransformWordBySelectList;
})(TransformStringBySelectList);

var TransformSmartWordBySelectList = (function (_TransformStringBySelectList2) {
  _inherits(TransformSmartWordBySelectList, _TransformStringBySelectList2);

  function TransformSmartWordBySelectList() {
    _classCallCheck(this, TransformSmartWordBySelectList);

    _get(Object.getPrototypeOf(TransformSmartWordBySelectList.prototype), 'constructor', this).apply(this, arguments);

    this.nextTarget = 'InnerSmartWord';
  }

  // -------------------------
  return TransformSmartWordBySelectList;
})(TransformStringBySelectList);

var ReplaceWithRegister = (function (_TransformString14) {
  _inherits(ReplaceWithRegister, _TransformString14);

  function ReplaceWithRegister() {
    _classCallCheck(this, ReplaceWithRegister);

    _get(Object.getPrototypeOf(ReplaceWithRegister.prototype), 'constructor', this).apply(this, arguments);

    this.flashType = 'operator-long';
  }

  _createClass(ReplaceWithRegister, [{
    key: 'initialize',
    value: function initialize() {
      this.vimState.sequentialPasteManager.onInitialize(this);
      _get(Object.getPrototypeOf(ReplaceWithRegister.prototype), 'initialize', this).call(this);
    }
  }, {
    key: 'execute',
    value: function execute() {
      this.sequentialPaste = this.vimState.sequentialPasteManager.onExecute(this);

      _get(Object.getPrototypeOf(ReplaceWithRegister.prototype), 'execute', this).call(this);

      for (var selection of this.editor.getSelections()) {
        var range = this.mutationManager.getMutatedBufferRangeForSelection(selection);
        this.vimState.sequentialPasteManager.savePastedRangeForSelection(selection, range);
      }
    }
  }, {
    key: 'getNewText',
    value: function getNewText(text, selection) {
      var value = this.vimState.register.get(null, selection, this.sequentialPaste);
      return value ? value.text : '';
    }
  }]);

  return ReplaceWithRegister;
})(TransformString);

var ReplaceOccurrenceWithRegister = (function (_ReplaceWithRegister) {
  _inherits(ReplaceOccurrenceWithRegister, _ReplaceWithRegister);

  function ReplaceOccurrenceWithRegister() {
    _classCallCheck(this, ReplaceOccurrenceWithRegister);

    _get(Object.getPrototypeOf(ReplaceOccurrenceWithRegister.prototype), 'constructor', this).apply(this, arguments);

    this.occurrence = true;
  }

  // Save text to register before replace
  return ReplaceOccurrenceWithRegister;
})(ReplaceWithRegister);

var SwapWithRegister = (function (_TransformString15) {
  _inherits(SwapWithRegister, _TransformString15);

  function SwapWithRegister() {
    _classCallCheck(this, SwapWithRegister);

    _get(Object.getPrototypeOf(SwapWithRegister.prototype), 'constructor', this).apply(this, arguments);
  }

  // Indent < TransformString
  // -------------------------

  _createClass(SwapWithRegister, [{
    key: 'getNewText',
    value: function getNewText(text, selection) {
      var newText = this.vimState.register.getText();
      this.setTextToRegister(text, selection);
      return newText;
    }
  }]);

  return SwapWithRegister;
})(TransformString);

var Indent = (function (_TransformString16) {
  _inherits(Indent, _TransformString16);

  function Indent() {
    _classCallCheck(this, Indent);

    _get(Object.getPrototypeOf(Indent.prototype), 'constructor', this).apply(this, arguments);

    this.stayByMarker = true;
    this.setToFirstCharacterOnLinewise = true;
    this.wise = 'linewise';
  }

  _createClass(Indent, [{
    key: 'mutateSelection',
    value: function mutateSelection(selection) {
      var _this7 = this;

      // Need count times indentation in visual-mode and its repeat(`.`).
      if (this.target.name === 'CurrentSelection') {
        (function () {
          var oldText = undefined;
          // limit to 100 to avoid freezing by accidental big number.
          _this7.countTimes(_this7.limitNumber(_this7.getCount(), { max: 100 }), function (_ref5) {
            var stop = _ref5.stop;

            oldText = selection.getText();
            _this7.indent(selection);
            if (selection.getText() === oldText) stop();
          });
        })();
      } else {
        this.indent(selection);
      }
    }
  }, {
    key: 'indent',
    value: function indent(selection) {
      selection.indentSelectedRows();
    }
  }]);

  return Indent;
})(TransformString);

var Outdent = (function (_Indent) {
  _inherits(Outdent, _Indent);

  function Outdent() {
    _classCallCheck(this, Outdent);

    _get(Object.getPrototypeOf(Outdent.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Outdent, [{
    key: 'indent',
    value: function indent(selection) {
      selection.outdentSelectedRows();
    }
  }]);

  return Outdent;
})(Indent);

var AutoIndent = (function (_Indent2) {
  _inherits(AutoIndent, _Indent2);

  function AutoIndent() {
    _classCallCheck(this, AutoIndent);

    _get(Object.getPrototypeOf(AutoIndent.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(AutoIndent, [{
    key: 'indent',
    value: function indent(selection) {
      selection.autoIndentSelectedRows();
    }
  }]);

  return AutoIndent;
})(Indent);

var ToggleLineComments = (function (_TransformString17) {
  _inherits(ToggleLineComments, _TransformString17);

  function ToggleLineComments() {
    _classCallCheck(this, ToggleLineComments);

    _get(Object.getPrototypeOf(ToggleLineComments.prototype), 'constructor', this).apply(this, arguments);

    this.flashTarget = false;
    this.stayByMarker = true;
    this.stayAtSamePosition = true;
    this.wise = 'linewise';
  }

  _createClass(ToggleLineComments, [{
    key: 'mutateSelection',
    value: function mutateSelection(selection) {
      selection.toggleLineComments();
    }
  }]);

  return ToggleLineComments;
})(TransformString);

var Reflow = (function (_TransformString18) {
  _inherits(Reflow, _TransformString18);

  function Reflow() {
    _classCallCheck(this, Reflow);

    _get(Object.getPrototypeOf(Reflow.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Reflow, [{
    key: 'mutateSelection',
    value: function mutateSelection(selection) {
      atom.commands.dispatch(this.editorElement, 'autoflow:reflow-selection');
    }
  }]);

  return Reflow;
})(TransformString);

var ReflowWithStay = (function (_Reflow) {
  _inherits(ReflowWithStay, _Reflow);

  function ReflowWithStay() {
    _classCallCheck(this, ReflowWithStay);

    _get(Object.getPrototypeOf(ReflowWithStay.prototype), 'constructor', this).apply(this, arguments);

    this.stayAtSamePosition = true;
  }

  // Surround < TransformString
  // -------------------------
  return ReflowWithStay;
})(Reflow);

var SurroundBase = (function (_TransformString19) {
  _inherits(SurroundBase, _TransformString19);

  function SurroundBase() {
    _classCallCheck(this, SurroundBase);

    _get(Object.getPrototypeOf(SurroundBase.prototype), 'constructor', this).apply(this, arguments);

    this.surroundAction = null;
    this.pairs = [['(', ')'], ['{', '}'], ['[', ']'], ['<', '>']];
    this.pairsByAlias = {
      b: ['(', ')'],
      B: ['{', '}'],
      r: ['[', ']'],
      a: ['<', '>']
    };
  }

  _createClass(SurroundBase, [{
    key: 'initialize',
    value: function initialize() {
      this.replaceByDiff = this.getConfig('replaceByDiffOnSurround');
      this.stayByMarker = this.replaceByDiff;
      _get(Object.getPrototypeOf(SurroundBase.prototype), 'initialize', this).call(this);
    }
  }, {
    key: 'getPair',
    value: function getPair(char) {
      return char in this.pairsByAlias ? this.pairsByAlias[char] : [].concat(_toConsumableArray(this.pairs), [[char, char]]).find(function (pair) {
        return pair.includes(char);
      });
    }
  }, {
    key: 'surround',
    value: function surround(text, char) {
      var _this8 = this;

      var _ref6 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var _ref6$keepLayout = _ref6.keepLayout;
      var keepLayout = _ref6$keepLayout === undefined ? false : _ref6$keepLayout;
      var selection = _ref6.selection;

      var _getPair = this.getPair(char);

      var _getPair2 = _slicedToArray(_getPair, 2);

      var open = _getPair2[0];
      var close = _getPair2[1];

      if (!keepLayout && text.endsWith('\n')) {
        (function () {
          var baseIndentLevel = _this8.editor.indentationForBufferRow(selection.getBufferRange().start.row);
          var indentTextStartRow = _this8.editor.buildIndentString(baseIndentLevel);
          var indentTextOneLevel = _this8.editor.buildIndentString(1);

          open = indentTextStartRow + open + '\n';
          text = text.replace(/^(.+)$/gm, function (m) {
            return indentTextOneLevel + m;
          });
          close = indentTextStartRow + close + '\n';
        })();
      }

      if (this.getConfig('charactersToAddSpaceOnSurround').includes(char) && this.utils.isSingleLineText(text)) {
        text = ' ' + text + ' ';
      }

      return open + text + close;
    }
  }, {
    key: 'deleteSurround',
    value: function deleteSurround(text) {
      // Assume surrounding char is one-char length.
      var open = text[0];
      var close = text[text.length - 1];
      var innerText = text.slice(1, text.length - 1);
      return this.utils.isSingleLineText(text) && open !== close ? innerText.trim() : innerText;
    }
  }, {
    key: 'getNewText',
    value: function getNewText(text, selection) {
      if (this.surroundAction === 'surround') {
        return this.surround(text, this.input, { selection: selection });
      } else if (this.surroundAction === 'delete-surround') {
        return this.deleteSurround(text);
      } else if (this.surroundAction === 'change-surround') {
        return this.surround(this.deleteSurround(text), this.input, { keepLayout: true });
      }
    }
  }], [{
    key: 'command',
    value: false,
    enumerable: true
  }]);

  return SurroundBase;
})(TransformString);

var Surround = (function (_SurroundBase) {
  _inherits(Surround, _SurroundBase);

  function Surround() {
    _classCallCheck(this, Surround);

    _get(Object.getPrototypeOf(Surround.prototype), 'constructor', this).apply(this, arguments);

    this.surroundAction = 'surround';
    this.readInputAfterSelect = true;
  }

  return Surround;
})(SurroundBase);

var SurroundWord = (function (_Surround) {
  _inherits(SurroundWord, _Surround);

  function SurroundWord() {
    _classCallCheck(this, SurroundWord);

    _get(Object.getPrototypeOf(SurroundWord.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'InnerWord';
  }

  return SurroundWord;
})(Surround);

var SurroundSmartWord = (function (_Surround2) {
  _inherits(SurroundSmartWord, _Surround2);

  function SurroundSmartWord() {
    _classCallCheck(this, SurroundSmartWord);

    _get(Object.getPrototypeOf(SurroundSmartWord.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'InnerSmartWord';
  }

  return SurroundSmartWord;
})(Surround);

var MapSurround = (function (_Surround3) {
  _inherits(MapSurround, _Surround3);

  function MapSurround() {
    _classCallCheck(this, MapSurround);

    _get(Object.getPrototypeOf(MapSurround.prototype), 'constructor', this).apply(this, arguments);

    this.occurrence = true;
    this.patternForOccurrence = /\w+/g;
  }

  // Delete Surround
  // -------------------------
  return MapSurround;
})(Surround);

var DeleteSurround = (function (_SurroundBase2) {
  _inherits(DeleteSurround, _SurroundBase2);

  function DeleteSurround() {
    _classCallCheck(this, DeleteSurround);

    _get(Object.getPrototypeOf(DeleteSurround.prototype), 'constructor', this).apply(this, arguments);

    this.surroundAction = 'delete-surround';
  }

  _createClass(DeleteSurround, [{
    key: 'initialize',
    value: function initialize() {
      var _this9 = this;

      if (!this.target) {
        this.focusInput({
          onConfirm: function onConfirm(char) {
            _this9.setTarget(_this9.getInstance('APair', { pair: _this9.getPair(char) }));
            _this9.processOperation();
          }
        });
      }
      _get(Object.getPrototypeOf(DeleteSurround.prototype), 'initialize', this).call(this);
    }
  }]);

  return DeleteSurround;
})(SurroundBase);

var DeleteSurroundAnyPair = (function (_DeleteSurround) {
  _inherits(DeleteSurroundAnyPair, _DeleteSurround);

  function DeleteSurroundAnyPair() {
    _classCallCheck(this, DeleteSurroundAnyPair);

    _get(Object.getPrototypeOf(DeleteSurroundAnyPair.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'AAnyPair';
  }

  return DeleteSurroundAnyPair;
})(DeleteSurround);

var DeleteSurroundAnyPairAllowForwarding = (function (_DeleteSurroundAnyPair) {
  _inherits(DeleteSurroundAnyPairAllowForwarding, _DeleteSurroundAnyPair);

  function DeleteSurroundAnyPairAllowForwarding() {
    _classCallCheck(this, DeleteSurroundAnyPairAllowForwarding);

    _get(Object.getPrototypeOf(DeleteSurroundAnyPairAllowForwarding.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'AAnyPairAllowForwarding';
  }

  // Change Surround
  // -------------------------
  return DeleteSurroundAnyPairAllowForwarding;
})(DeleteSurroundAnyPair);

var ChangeSurround = (function (_DeleteSurround2) {
  _inherits(ChangeSurround, _DeleteSurround2);

  function ChangeSurround() {
    _classCallCheck(this, ChangeSurround);

    _get(Object.getPrototypeOf(ChangeSurround.prototype), 'constructor', this).apply(this, arguments);

    this.surroundAction = 'change-surround';
    this.readInputAfterSelect = true;
  }

  _createClass(ChangeSurround, [{
    key: 'focusInputPromised',

    // Override to show changing char on hover
    value: _asyncToGenerator(function* () {
      var hoverPoint = this.mutationManager.getInitialPointForSelection(this.editor.getLastSelection());
      this.vimState.hover.set(this.editor.getSelectedText()[0], hoverPoint);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _get(Object.getPrototypeOf(ChangeSurround.prototype), 'focusInputPromised', this).apply(this, args);
    })
  }]);

  return ChangeSurround;
})(DeleteSurround);

var ChangeSurroundAnyPair = (function (_ChangeSurround) {
  _inherits(ChangeSurroundAnyPair, _ChangeSurround);

  function ChangeSurroundAnyPair() {
    _classCallCheck(this, ChangeSurroundAnyPair);

    _get(Object.getPrototypeOf(ChangeSurroundAnyPair.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'AAnyPair';
  }

  return ChangeSurroundAnyPair;
})(ChangeSurround);

var ChangeSurroundAnyPairAllowForwarding = (function (_ChangeSurroundAnyPair) {
  _inherits(ChangeSurroundAnyPairAllowForwarding, _ChangeSurroundAnyPair);

  function ChangeSurroundAnyPairAllowForwarding() {
    _classCallCheck(this, ChangeSurroundAnyPairAllowForwarding);

    _get(Object.getPrototypeOf(ChangeSurroundAnyPairAllowForwarding.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'AAnyPairAllowForwarding';
  }

  // -------------------------
  // FIXME
  // Currently native editor.joinLines() is better for cursor position setting
  // So I use native methods for a meanwhile.
  return ChangeSurroundAnyPairAllowForwarding;
})(ChangeSurroundAnyPair);

var JoinTarget = (function (_TransformString20) {
  _inherits(JoinTarget, _TransformString20);

  function JoinTarget() {
    _classCallCheck(this, JoinTarget);

    _get(Object.getPrototypeOf(JoinTarget.prototype), 'constructor', this).apply(this, arguments);

    this.flashTarget = false;
    this.restorePositions = false;
  }

  _createClass(JoinTarget, [{
    key: 'mutateSelection',
    value: function mutateSelection(selection) {
      var range = selection.getBufferRange();

      // When cursor is at last BUFFER row, it select last-buffer-row, then
      // joinning result in "clear last-buffer-row text".
      // I believe this is BUG of upstream atom-core. guard this situation here
      if (!range.isSingleLine() || range.end.row !== this.editor.getLastBufferRow()) {
        if (this.utils.isLinewiseRange(range)) {
          selection.setBufferRange(range.translate([0, 0], [-1, Infinity]));
        }
        selection.joinLines();
      }
      var point = selection.getBufferRange().end.translate([0, -1]);
      return selection.cursor.setBufferPosition(point);
    }
  }]);

  return JoinTarget;
})(TransformString);

var Join = (function (_JoinTarget) {
  _inherits(Join, _JoinTarget);

  function Join() {
    _classCallCheck(this, Join);

    _get(Object.getPrototypeOf(Join.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'MoveToRelativeLine';
  }

  return Join;
})(JoinTarget);

var JoinBase = (function (_TransformString21) {
  _inherits(JoinBase, _TransformString21);

  function JoinBase() {
    _classCallCheck(this, JoinBase);

    _get(Object.getPrototypeOf(JoinBase.prototype), 'constructor', this).apply(this, arguments);

    this.wise = 'linewise';
    this.trim = false;
    this.target = 'MoveToRelativeLineMinimumTwo';
  }

  _createClass(JoinBase, [{
    key: 'getNewText',
    value: function getNewText(text) {
      var regex = this.trim ? /\r?\n[ \t]*/g : /\r?\n/g;
      return text.trimRight().replace(regex, this.input) + '\n';
    }
  }], [{
    key: 'command',
    value: false,
    enumerable: true
  }]);

  return JoinBase;
})(TransformString);

var JoinWithKeepingSpace = (function (_JoinBase) {
  _inherits(JoinWithKeepingSpace, _JoinBase);

  function JoinWithKeepingSpace() {
    _classCallCheck(this, JoinWithKeepingSpace);

    _get(Object.getPrototypeOf(JoinWithKeepingSpace.prototype), 'constructor', this).apply(this, arguments);

    this.input = '';
  }

  return JoinWithKeepingSpace;
})(JoinBase);

var JoinByInput = (function (_JoinBase2) {
  _inherits(JoinByInput, _JoinBase2);

  function JoinByInput() {
    _classCallCheck(this, JoinByInput);

    _get(Object.getPrototypeOf(JoinByInput.prototype), 'constructor', this).apply(this, arguments);

    this.readInputAfterSelect = true;
    this.focusInputOptions = { charsMax: 10 };
    this.trim = true;
  }

  return JoinByInput;
})(JoinBase);

var JoinByInputWithKeepingSpace = (function (_JoinByInput) {
  _inherits(JoinByInputWithKeepingSpace, _JoinByInput);

  function JoinByInputWithKeepingSpace() {
    _classCallCheck(this, JoinByInputWithKeepingSpace);

    _get(Object.getPrototypeOf(JoinByInputWithKeepingSpace.prototype), 'constructor', this).apply(this, arguments);

    this.trim = false;
  }

  // -------------------------
  // String suffix in name is to avoid confusion with 'split' window.
  return JoinByInputWithKeepingSpace;
})(JoinByInput);

var SplitString = (function (_TransformString22) {
  _inherits(SplitString, _TransformString22);

  function SplitString() {
    _classCallCheck(this, SplitString);

    _get(Object.getPrototypeOf(SplitString.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'MoveToRelativeLine';
    this.keepSplitter = false;
    this.readInputAfterSelect = true;
    this.focusInputOptions = { charsMax: 10 };
  }

  _createClass(SplitString, [{
    key: 'getNewText',
    value: function getNewText(text) {
      var regex = new RegExp(this._.escapeRegExp(this.input || '\\n'), 'g');
      var lineSeparator = (this.keepSplitter ? this.input : '') + '\n';
      return text.replace(regex, lineSeparator);
    }
  }]);

  return SplitString;
})(TransformString);

var SplitStringWithKeepingSplitter = (function (_SplitString) {
  _inherits(SplitStringWithKeepingSplitter, _SplitString);

  function SplitStringWithKeepingSplitter() {
    _classCallCheck(this, SplitStringWithKeepingSplitter);

    _get(Object.getPrototypeOf(SplitStringWithKeepingSplitter.prototype), 'constructor', this).apply(this, arguments);

    this.keepSplitter = true;
  }

  return SplitStringWithKeepingSplitter;
})(SplitString);

var SplitArguments = (function (_TransformString23) {
  _inherits(SplitArguments, _TransformString23);

  function SplitArguments() {
    _classCallCheck(this, SplitArguments);

    _get(Object.getPrototypeOf(SplitArguments.prototype), 'constructor', this).apply(this, arguments);

    this.keepSeparator = true;
  }

  _createClass(SplitArguments, [{
    key: 'getNewText',
    value: function getNewText(text, selection) {
      var allTokens = this.utils.splitArguments(text.trim());
      var newText = '';

      var baseIndentLevel = this.editor.indentationForBufferRow(selection.getBufferRange().start.row);
      var indentTextStartRow = this.editor.buildIndentString(baseIndentLevel);
      var indentTextInnerRows = this.editor.buildIndentString(baseIndentLevel + 1);

      while (allTokens.length) {
        var _allTokens$shift = allTokens.shift();

        var _text = _allTokens$shift.text;
        var type = _allTokens$shift.type;

        newText += type === 'separator' ? (this.keepSeparator ? _text.trim() : '') + '\n' : indentTextInnerRows + _text;
      }
      return '\n' + newText + '\n' + indentTextStartRow;
    }
  }]);

  return SplitArguments;
})(TransformString);

var SplitArgumentsWithRemoveSeparator = (function (_SplitArguments) {
  _inherits(SplitArgumentsWithRemoveSeparator, _SplitArguments);

  function SplitArgumentsWithRemoveSeparator() {
    _classCallCheck(this, SplitArgumentsWithRemoveSeparator);

    _get(Object.getPrototypeOf(SplitArgumentsWithRemoveSeparator.prototype), 'constructor', this).apply(this, arguments);

    this.keepSeparator = false;
  }

  return SplitArgumentsWithRemoveSeparator;
})(SplitArguments);

var SplitArgumentsOfInnerAnyPair = (function (_SplitArguments2) {
  _inherits(SplitArgumentsOfInnerAnyPair, _SplitArguments2);

  function SplitArgumentsOfInnerAnyPair() {
    _classCallCheck(this, SplitArgumentsOfInnerAnyPair);

    _get(Object.getPrototypeOf(SplitArgumentsOfInnerAnyPair.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'InnerAnyPair';
  }

  return SplitArgumentsOfInnerAnyPair;
})(SplitArguments);

var ChangeOrder = (function (_TransformString24) {
  _inherits(ChangeOrder, _TransformString24);

  function ChangeOrder() {
    _classCallCheck(this, ChangeOrder);

    _get(Object.getPrototypeOf(ChangeOrder.prototype), 'constructor', this).apply(this, arguments);

    this.action = null;
    this.sortBy = null;
  }

  _createClass(ChangeOrder, [{
    key: 'getNewText',
    value: function getNewText(text) {
      var _this10 = this;

      return this.target.isLinewise() ? this.getNewList(this.utils.splitTextByNewLine(text)).join('\n') + '\n' : this.sortArgumentsInTextBy(text, function (args) {
        return _this10.getNewList(args);
      });
    }
  }, {
    key: 'getNewList',
    value: function getNewList(rows) {
      if (rows.length === 1) {
        return [this.utils.changeCharOrder(rows[0], this.action, this.sortBy)];
      } else {
        return this.utils.changeArrayOrder(rows, this.action, this.sortBy);
      }
    }
  }, {
    key: 'sortArgumentsInTextBy',
    value: function sortArgumentsInTextBy(text, fn) {
      var start = text.search(/\S/);
      var end = text.search(/\s*$/);
      var leadingSpaces = start !== -1 ? text.slice(0, start) : '';
      var trailingSpaces = end !== -1 ? text.slice(end) : '';
      var allTokens = this.utils.splitArguments(text.slice(start, end));
      var args = allTokens.filter(function (token) {
        return token.type === 'argument';
      }).map(function (token) {
        return token.text;
      });
      var newArgs = fn(args);

      var newText = '';
      while (allTokens.length) {
        var token = allTokens.shift();
        // token.type is "separator" or "argument"
        newText += token.type === 'separator' ? token.text : newArgs.shift();
      }
      return leadingSpaces + newText + trailingSpaces;
    }
  }], [{
    key: 'command',
    value: false,
    enumerable: true
  }]);

  return ChangeOrder;
})(TransformString);

var Reverse = (function (_ChangeOrder) {
  _inherits(Reverse, _ChangeOrder);

  function Reverse() {
    _classCallCheck(this, Reverse);

    _get(Object.getPrototypeOf(Reverse.prototype), 'constructor', this).apply(this, arguments);

    this.action = 'reverse';
  }

  return Reverse;
})(ChangeOrder);

var ReverseInnerAnyPair = (function (_Reverse) {
  _inherits(ReverseInnerAnyPair, _Reverse);

  function ReverseInnerAnyPair() {
    _classCallCheck(this, ReverseInnerAnyPair);

    _get(Object.getPrototypeOf(ReverseInnerAnyPair.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'InnerAnyPair';
  }

  return ReverseInnerAnyPair;
})(Reverse);

var Rotate = (function (_ChangeOrder2) {
  _inherits(Rotate, _ChangeOrder2);

  function Rotate() {
    _classCallCheck(this, Rotate);

    _get(Object.getPrototypeOf(Rotate.prototype), 'constructor', this).apply(this, arguments);

    this.action = 'rotate-left';
  }

  return Rotate;
})(ChangeOrder);

var RotateBackwards = (function (_ChangeOrder3) {
  _inherits(RotateBackwards, _ChangeOrder3);

  function RotateBackwards() {
    _classCallCheck(this, RotateBackwards);

    _get(Object.getPrototypeOf(RotateBackwards.prototype), 'constructor', this).apply(this, arguments);

    this.action = 'rotate-right';
  }

  return RotateBackwards;
})(ChangeOrder);

var RotateArgumentsOfInnerPair = (function (_Rotate) {
  _inherits(RotateArgumentsOfInnerPair, _Rotate);

  function RotateArgumentsOfInnerPair() {
    _classCallCheck(this, RotateArgumentsOfInnerPair);

    _get(Object.getPrototypeOf(RotateArgumentsOfInnerPair.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'InnerAnyPair';
  }

  return RotateArgumentsOfInnerPair;
})(Rotate);

var RotateArgumentsBackwardsOfInnerPair = (function (_RotateBackwards) {
  _inherits(RotateArgumentsBackwardsOfInnerPair, _RotateBackwards);

  function RotateArgumentsBackwardsOfInnerPair() {
    _classCallCheck(this, RotateArgumentsBackwardsOfInnerPair);

    _get(Object.getPrototypeOf(RotateArgumentsBackwardsOfInnerPair.prototype), 'constructor', this).apply(this, arguments);

    this.target = 'InnerAnyPair';
  }

  return RotateArgumentsBackwardsOfInnerPair;
})(RotateBackwards);

var Sort = (function (_ChangeOrder4) {
  _inherits(Sort, _ChangeOrder4);

  function Sort() {
    _classCallCheck(this, Sort);

    _get(Object.getPrototypeOf(Sort.prototype), 'constructor', this).apply(this, arguments);

    this.action = 'sort';
  }

  return Sort;
})(ChangeOrder);

var SortCaseInsensitively = (function (_Sort) {
  _inherits(SortCaseInsensitively, _Sort);

  function SortCaseInsensitively() {
    _classCallCheck(this, SortCaseInsensitively);

    _get(Object.getPrototypeOf(SortCaseInsensitively.prototype), 'constructor', this).apply(this, arguments);

    this.sortBy = function (rowA, rowB) {
      return rowA.localeCompare(rowB, { sensitivity: 'base' });
    };
  }

  return SortCaseInsensitively;
})(Sort);

var SortByNumber = (function (_Sort2) {
  _inherits(SortByNumber, _Sort2);

  function SortByNumber() {
    _classCallCheck(this, SortByNumber);

    _get(Object.getPrototypeOf(SortByNumber.prototype), 'constructor', this).apply(this, arguments);

    this.sortBy = function (rowA, rowB) {
      return (Number.parseInt(rowA) || Infinity) - (Number.parseInt(rowB) || Infinity);
    };
  }

  return SortByNumber;
})(Sort);

var NumberingLines = (function (_TransformString25) {
  _inherits(NumberingLines, _TransformString25);

  function NumberingLines() {
    _classCallCheck(this, NumberingLines);

    _get(Object.getPrototypeOf(NumberingLines.prototype), 'constructor', this).apply(this, arguments);

    this.wise = 'linewise';
  }

  _createClass(NumberingLines, [{
    key: 'getNewText',
    value: function getNewText(text) {
      var _this11 = this;

      var rows = this.utils.splitTextByNewLine(text);
      var lastRowWidth = String(rows.length).length;

      var newRows = rows.map(function (rowText, i) {
        i++; // fix 0 start index to 1 start.
        var amountOfPadding = _this11.limitNumber(lastRowWidth - String(i).length, { min: 0 });
        return ' '.repeat(amountOfPadding) + i + ': ' + rowText;
      });
      return newRows.join('\n') + '\n';
    }
  }]);

  return NumberingLines;
})(TransformString);

var DuplicateWithCommentOutOriginal = (function (_TransformString26) {
  _inherits(DuplicateWithCommentOutOriginal, _TransformString26);

  function DuplicateWithCommentOutOriginal() {
    _classCallCheck(this, DuplicateWithCommentOutOriginal);

    _get(Object.getPrototypeOf(DuplicateWithCommentOutOriginal.prototype), 'constructor', this).apply(this, arguments);

    this.wise = 'linewise';
    this.stayByMarker = true;
    this.stayAtSamePosition = true;
  }

  _createClass(DuplicateWithCommentOutOriginal, [{
    key: 'mutateSelection',
    value: function mutateSelection(selection) {
      var _selection$getBufferRowRange = selection.getBufferRowRange();

      var _selection$getBufferRowRange2 = _slicedToArray(_selection$getBufferRowRange, 2);

      var startRow = _selection$getBufferRowRange2[0];
      var endRow = _selection$getBufferRowRange2[1];

      selection.setBufferRange(this.utils.insertTextAtBufferPosition(this.editor, [startRow, 0], selection.getText()));
      this.editor.toggleLineCommentsForBufferRows(startRow, endRow);
    }
  }]);

  return DuplicateWithCommentOutOriginal;
})(TransformString);

module.exports = {
  TransformString: TransformString,

  NoCase: NoCase,
  DotCase: DotCase,
  SwapCase: SwapCase,
  PathCase: PathCase,
  UpperCase: UpperCase,
  LowerCase: LowerCase,
  CamelCase: CamelCase,
  SnakeCase: SnakeCase,
  TitleCase: TitleCase,
  ParamCase: ParamCase,
  HeaderCase: HeaderCase,
  PascalCase: PascalCase,
  ConstantCase: ConstantCase,
  SentenceCase: SentenceCase,
  UpperCaseFirst: UpperCaseFirst,
  LowerCaseFirst: LowerCaseFirst,
  DashCase: DashCase,
  ToggleCase: ToggleCase,
  ToggleCaseAndMoveRight: ToggleCaseAndMoveRight,

  Replace: Replace,
  ReplaceCharacter: ReplaceCharacter,
  SplitByCharacter: SplitByCharacter,
  EncodeUriComponent: EncodeUriComponent,
  DecodeUriComponent: DecodeUriComponent,
  TrimString: TrimString,
  CompactSpaces: CompactSpaces,
  AlignOccurrence: AlignOccurrence,
  AlignOccurrenceByPadLeft: AlignOccurrenceByPadLeft,
  AlignOccurrenceByPadRight: AlignOccurrenceByPadRight,
  RemoveLeadingWhiteSpaces: RemoveLeadingWhiteSpaces,
  ConvertToSoftTab: ConvertToSoftTab,
  ConvertToHardTab: ConvertToHardTab,
  TransformStringByExternalCommand: TransformStringByExternalCommand,
  TransformStringBySelectList: TransformStringBySelectList,
  TransformWordBySelectList: TransformWordBySelectList,
  TransformSmartWordBySelectList: TransformSmartWordBySelectList,
  ReplaceWithRegister: ReplaceWithRegister,
  ReplaceOccurrenceWithRegister: ReplaceOccurrenceWithRegister,
  SwapWithRegister: SwapWithRegister,
  Indent: Indent,
  Outdent: Outdent,
  AutoIndent: AutoIndent,
  ToggleLineComments: ToggleLineComments,
  Reflow: Reflow,
  ReflowWithStay: ReflowWithStay,
  SurroundBase: SurroundBase,
  Surround: Surround,
  SurroundWord: SurroundWord,
  SurroundSmartWord: SurroundSmartWord,
  MapSurround: MapSurround,
  DeleteSurround: DeleteSurround,
  DeleteSurroundAnyPair: DeleteSurroundAnyPair,
  DeleteSurroundAnyPairAllowForwarding: DeleteSurroundAnyPairAllowForwarding,
  ChangeSurround: ChangeSurround,
  ChangeSurroundAnyPair: ChangeSurroundAnyPair,
  ChangeSurroundAnyPairAllowForwarding: ChangeSurroundAnyPairAllowForwarding,
  JoinTarget: JoinTarget,
  Join: Join,
  JoinBase: JoinBase,
  JoinWithKeepingSpace: JoinWithKeepingSpace,
  JoinByInput: JoinByInput,
  JoinByInputWithKeepingSpace: JoinByInputWithKeepingSpace,
  SplitString: SplitString,
  SplitStringWithKeepingSplitter: SplitStringWithKeepingSplitter,
  SplitArguments: SplitArguments,
  SplitArgumentsWithRemoveSeparator: SplitArgumentsWithRemoveSeparator,
  SplitArgumentsOfInnerAnyPair: SplitArgumentsOfInnerAnyPair,
  ChangeOrder: ChangeOrder,
  Reverse: Reverse,
  ReverseInnerAnyPair: ReverseInnerAnyPair,
  Rotate: Rotate,
  RotateBackwards: RotateBackwards,
  RotateArgumentsOfInnerPair: RotateArgumentsOfInnerPair,
  RotateArgumentsBackwardsOfInnerPair: RotateArgumentsBackwardsOfInnerPair,
  Sort: Sort,
  SortCaseInsensitively: SortCaseInsensitively,
  SortByNumber: SortByNumber,
  NumberingLines: NumberingLines,
  DuplicateWithCommentOutOriginal: DuplicateWithCommentOutOriginal
};
for (var klass of Object.values(module.exports)) {
  if (klass.isCommand()) klass.registerToSelectList();
}
// e.g. command: 'sort'
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jbGluZ2llci8uYXRvbS9wYWNrYWdlcy92aW0tbW9kZS1wbHVzL2xpYi9vcGVyYXRvci10cmFuc2Zvcm0tc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVYLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUN6QyxJQUFJLFVBQVUsWUFBQSxDQUFBOztlQUVZLE9BQU8sQ0FBQyxNQUFNLENBQUM7O0lBQWxDLGVBQWUsWUFBZixlQUFlOztnQkFDSCxPQUFPLENBQUMsWUFBWSxDQUFDOztJQUFqQyxRQUFRLGFBQVIsUUFBUTs7Ozs7SUFJVCxlQUFlO1lBQWYsZUFBZTs7V0FBZixlQUFlOzBCQUFmLGVBQWU7OytCQUFmLGVBQWU7O1NBR25CLFdBQVcsR0FBRyxJQUFJO1NBQ2xCLGNBQWMsR0FBRyx1QkFBdUI7U0FDeEMsVUFBVSxHQUFHLEtBQUs7U0FDbEIsaUJBQWlCLEdBQUcsS0FBSztTQUN6QixhQUFhLEdBQUcsS0FBSzs7O2VBUGpCLGVBQWU7O1dBYUgseUJBQUMsU0FBUyxFQUFFO0FBQzFCLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQzVELFVBQUksSUFBSSxFQUFFO0FBQ1IsWUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQ3RCLGNBQUksQ0FBQyx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDakUsTUFBTTtBQUNMLG1CQUFTLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBQyxDQUFDLENBQUE7U0FDckc7T0FDRjtLQUNGOzs7V0FiMkIsZ0NBQUc7QUFDN0IsVUFBSSxDQUFD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LENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNqRCxNQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsRUFBRSxLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtDQUNwRCIsImZpbGUiOiIvVXNlcnMvY2xpbmdpZXIvLmF0b20vcGFja2FnZXMvdmltLW1vZGUtcGx1cy9saWIvb3BlcmF0b3ItdHJhbnNmb3JtLXN0cmluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbmNvbnN0IGNoYW5nZUNhc2UgPSByZXF1aXJlKCdjaGFuZ2UtY2FzZScpXG5sZXQgc2VsZWN0TGlzdFxuXG5jb25zdCB7QnVmZmVyZWRQcm9jZXNzfSA9IHJlcXVpcmUoJ2F0b20nKVxuY29uc3Qge09wZXJhdG9yfSA9IHJlcXVpcmUoJy4vb3BlcmF0b3InKVxuXG4vLyBUcmFuc2Zvcm1TdHJpbmdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5jbGFzcyBUcmFuc2Zvcm1TdHJpbmcgZXh0ZW5kcyBPcGVyYXRvciB7XG4gIHN0YXRpYyBjb21tYW5kID0gZmFsc2VcbiAgc3RhdGljIHN0cmluZ1RyYW5zZm9ybWVycyA9IFtdXG4gIHRyYWNrQ2hhbmdlID0gdHJ1ZVxuICBzdGF5T3B0aW9uTmFtZSA9ICdzdGF5T25UcmFuc2Zvcm1TdHJpbmcnXG4gIGF1dG9JbmRlbnQgPSBmYWxzZVxuICBhdXRvSW5kZW50TmV3bGluZSA9IGZhbHNlXG4gIHJlcGxhY2VCeURpZmYgPSBmYWxzZVxuXG4gIHN0YXRpYyByZWdpc3RlclRvU2VsZWN0TGlzdCAoKSB7XG4gICAgdGhpcy5zdHJpbmdUcmFuc2Zvcm1lcnMucHVzaCh0aGlzKVxuICB9XG5cbiAgbXV0YXRlU2VsZWN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5nZXROZXdUZXh0KHNlbGVjdGlvbi5nZXRUZXh0KCksIHNlbGVjdGlvbilcbiAgICBpZiAodGV4dCkge1xuICAgICAgaWYgKHRoaXMucmVwbGFjZUJ5RGlmZikge1xuICAgICAgICB0aGlzLnJlcGxhY2VUZXh0SW5SYW5nZVZpYURpZmYoc2VsZWN0aW9uLmdldEJ1ZmZlclJhbmdlKCksIHRleHQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3Rpb24uaW5zZXJ0VGV4dCh0ZXh0LCB7YXV0b0luZGVudDogdGhpcy5hdXRvSW5kZW50LCBhdXRvSW5kZW50TmV3bGluZTogdGhpcy5hdXRvSW5kZW50TmV3bGluZX0pXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIENoYW5nZUNhc2UgZXh0ZW5kcyBUcmFuc2Zvcm1TdHJpbmcge1xuICBzdGF0aWMgY29tbWFuZCA9IGZhbHNlXG4gIGdldE5ld1RleHQgKHRleHQpIHtcbiAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSB0aGlzLmZ1bmN0aW9uTmFtZSB8fCBjaGFuZ2VDYXNlLmxvd2VyQ2FzZUZpcnN0KHRoaXMubmFtZSlcbiAgICAvLyBIQUNLOiBQdXJlIFZpbSdzIGB+YCBpcyB0b28gYWdncmVzc2l2ZShlLmcuIHJlbW92ZSBwdW5jdHVhdGlvbiwgcmVtb3ZlIHdoaXRlIHNwYWNlcy4uLikuXG4gICAgLy8gSGVyZSBpbnRlbnRpb25hbGx5IG1ha2luZyBjaGFuZ2VDYXNlIGxlc3MgYWdncmVzc2l2ZSBieSBuYXJyb3dpbmcgdGFyZ2V0IGNoYXJzZXQuXG4gICAgY29uc3QgY2hhcnNldCA9ICdbXFx1MDBDMC1cXHUwMkFGXFx1MDM4Ni1cXHUwNTg3XFxcXHddJ1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgJHtjaGFyc2V0fSsoOj9bLS4vXT8ke2NoYXJzZXR9KykqYCwgJ2cnKVxuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UocmVnZXgsIG1hdGNoID0+IGNoYW5nZUNhc2VbZnVuY3Rpb25OYW1lXShtYXRjaCkpXG4gIH1cbn1cblxuY2xhc3MgTm9DYXNlIGV4dGVuZHMgQ2hhbmdlQ2FzZSB7fVxuY2xhc3MgRG90Q2FzZSBleHRlbmRzIENoYW5nZUNhc2Uge1xuICBzdGF0aWMgZGlzcGxheU5hbWVTdWZmaXggPSAnLidcbn1cbmNsYXNzIFN3YXBDYXNlIGV4dGVuZHMgQ2hhbmdlQ2FzZSB7XG4gIHN0YXRpYyBkaXNwbGF5TmFtZVN1ZmZpeCA9ICd+J1xufVxuY2xhc3MgUGF0aENhc2UgZXh0ZW5kcyBDaGFuZ2VDYXNlIHtcbiAgc3RhdGljIGRpc3BsYXlOYW1lU3VmZml4ID0gJy8nXG59XG5jbGFzcyBVcHBlckNhc2UgZXh0ZW5kcyBDaGFuZ2VDYXNlIHt9XG5jbGFzcyBMb3dlckNhc2UgZXh0ZW5kcyBDaGFuZ2VDYXNlIHt9XG5jbGFzcyBDYW1lbENhc2UgZXh0ZW5kcyBDaGFuZ2VDYXNlIHt9XG5jbGFzcyBTbmFrZUNhc2UgZXh0ZW5kcyBDaGFuZ2VDYXNlIHtcbiAgc3RhdGljIGRpc3BsYXlOYW1lU3VmZml4ID0gJ18nXG59XG5jbGFzcyBUaXRsZUNhc2UgZXh0ZW5kcyBDaGFuZ2VDYXNlIHt9XG5jbGFzcyBQYXJhbUNhc2UgZXh0ZW5kcyBDaGFuZ2VDYXNlIHtcbiAgc3RhdGljIGRpc3BsYXlOYW1lU3VmZml4ID0gJy0nXG59XG5jbGFzcyBIZWFkZXJDYXNlIGV4dGVuZHMgQ2hhbmdlQ2FzZSB7fVxuY2xhc3MgUGFzY2FsQ2FzZSBleHRlbmRzIENoYW5nZUNhc2Uge31cbmNsYXNzIENvbnN0YW50Q2FzZSBleHRlbmRzIENoYW5nZUNhc2Uge31cbmNsYXNzIFNlbnRlbmNlQ2FzZSBleHRlbmRzIENoYW5nZUNhc2Uge31cbmNsYXNzIFVwcGVyQ2FzZUZpcnN0IGV4dGVuZHMgQ2hhbmdlQ2FzZSB7fVxuY2xhc3MgTG93ZXJDYXNlRmlyc3QgZXh0ZW5kcyBDaGFuZ2VDYXNlIHt9XG5cbmNsYXNzIERhc2hDYXNlIGV4dGVuZHMgQ2hhbmdlQ2FzZSB7XG4gIHN0YXRpYyBkaXNwbGF5TmFtZVN1ZmZpeCA9ICctJ1xuICBmdW5jdGlvbk5hbWUgPSAncGFyYW1DYXNlJ1xufVxuY2xhc3MgVG9nZ2xlQ2FzZSBleHRlbmRzIENoYW5nZUNhc2Uge1xuICBzdGF0aWMgZGlzcGxheU5hbWVTdWZmaXggPSAnfidcbiAgZnVuY3Rpb25OYW1lID0gJ3N3YXBDYXNlJ1xufVxuXG5jbGFzcyBUb2dnbGVDYXNlQW5kTW92ZVJpZ2h0IGV4dGVuZHMgQ2hhbmdlQ2FzZSB7XG4gIGZ1bmN0aW9uTmFtZSA9ICdzd2FwQ2FzZSdcbiAgZmxhc2hUYXJnZXQgPSBmYWxzZVxuICByZXN0b3JlUG9zaXRpb25zID0gZmFsc2VcbiAgdGFyZ2V0ID0gJ01vdmVSaWdodCdcbn1cblxuLy8gUmVwbGFjZVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuY2xhc3MgUmVwbGFjZSBleHRlbmRzIFRyYW5zZm9ybVN0cmluZyB7XG4gIGZsYXNoQ2hlY2twb2ludCA9ICdkaWQtc2VsZWN0LW9jY3VycmVuY2UnXG4gIGF1dG9JbmRlbnROZXdsaW5lID0gdHJ1ZVxuICByZWFkSW5wdXRBZnRlclNlbGVjdCA9IHRydWVcblxuICBnZXROZXdUZXh0ICh0ZXh0KSB7XG4gICAgaWYgKHRoaXMudGFyZ2V0Lm5hbWUgPT09ICdNb3ZlUmlnaHRCdWZmZXJDb2x1bW4nICYmIHRleHQubGVuZ3RoICE9PSB0aGlzLmdldENvdW50KCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5pbnB1dCB8fCAnXFxuJ1xuICAgIGlmIChpbnB1dCA9PT0gJ1xcbicpIHtcbiAgICAgIHRoaXMucmVzdG9yZVBvc2l0aW9ucyA9IGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoLy4vZywgaW5wdXQpXG4gIH1cbn1cblxuY2xhc3MgUmVwbGFjZUNoYXJhY3RlciBleHRlbmRzIFJlcGxhY2Uge1xuICB0YXJnZXQgPSAnTW92ZVJpZ2h0QnVmZmVyQ29sdW1uJ1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBEVVAgbWVhbmluZyB3aXRoIFNwbGl0U3RyaW5nIG5lZWQgY29uc29saWRhdGUuXG5jbGFzcyBTcGxpdEJ5Q2hhcmFjdGVyIGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgZ2V0TmV3VGV4dCAodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnNwbGl0KCcnKS5qb2luKCcgJylcbiAgfVxufVxuXG5jbGFzcyBFbmNvZGVVcmlDb21wb25lbnQgZXh0ZW5kcyBUcmFuc2Zvcm1TdHJpbmcge1xuICBzdGF0aWMgZGlzcGxheU5hbWVTdWZmaXggPSAnJSdcbiAgZ2V0TmV3VGV4dCAodGV4dCkge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodGV4dClcbiAgfVxufVxuXG5jbGFzcyBEZWNvZGVVcmlDb21wb25lbnQgZXh0ZW5kcyBUcmFuc2Zvcm1TdHJpbmcge1xuICBzdGF0aWMgZGlzcGxheU5hbWVTdWZmaXggPSAnJSUnXG4gIGdldE5ld1RleHQgKHRleHQpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHRleHQpXG4gIH1cbn1cblxuY2xhc3MgVHJpbVN0cmluZyBleHRlbmRzIFRyYW5zZm9ybVN0cmluZyB7XG4gIHN0YXlCeU1hcmtlciA9IHRydWVcbiAgcmVwbGFjZUJ5RGlmZiA9IHRydWVcblxuICBnZXROZXdUZXh0ICh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQudHJpbSgpXG4gIH1cbn1cblxuY2xhc3MgQ29tcGFjdFNwYWNlcyBleHRlbmRzIFRyYW5zZm9ybVN0cmluZyB7XG4gIGdldE5ld1RleHQgKHRleHQpIHtcbiAgICBpZiAodGV4dC5tYXRjaCgvXlsgXSskLykpIHtcbiAgICAgIHJldHVybiAnICdcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRG9uJ3QgY29tcGFjdCBmb3IgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGUgc3BhY2VzLlxuICAgICAgY29uc3QgcmVnZXggPSAvXihcXHMqKSguKj8pKFxccyopJC9nbVxuICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShyZWdleCwgKG0sIGxlYWRpbmcsIG1pZGRsZSwgdHJhaWxpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmcgKyBtaWRkbGUuc3BsaXQoL1sgXFx0XSsvKS5qb2luKCcgJykgKyB0cmFpbGluZ1xuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgQWxpZ25PY2N1cnJlbmNlIGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgb2NjdXJyZW5jZSA9IHRydWVcbiAgd2hpY2hUb1BhZCA9ICdhdXRvJ1xuXG4gIGdldFNlbGVjdGlvblRha2VyICgpIHtcbiAgICBjb25zdCBzZWxlY3Rpb25zQnlSb3cgPSB7fVxuICAgIGZvciAoY29uc3Qgc2VsZWN0aW9uIG9mIHRoaXMuZWRpdG9yLmdldFNlbGVjdGlvbnNPcmRlcmVkQnlCdWZmZXJQb3NpdGlvbigpKSB7XG4gICAgICBjb25zdCByb3cgPSBzZWxlY3Rpb24uZ2V0QnVmZmVyUmFuZ2UoKS5zdGFydC5yb3dcbiAgICAgIGlmICghKHJvdyBpbiBzZWxlY3Rpb25zQnlSb3cpKSBzZWxlY3Rpb25zQnlSb3dbcm93XSA9IFtdXG4gICAgICBzZWxlY3Rpb25zQnlSb3dbcm93XS5wdXNoKHNlbGVjdGlvbilcbiAgICB9XG4gICAgY29uc3QgYWxsUm93cyA9IE9iamVjdC5rZXlzKHNlbGVjdGlvbnNCeVJvdylcbiAgICByZXR1cm4gKCkgPT4gYWxsUm93cy5tYXAocm93ID0+IHNlbGVjdGlvbnNCeVJvd1tyb3ddLnNoaWZ0KCkpLmZpbHRlcihzID0+IHMpXG4gIH1cblxuICBnZXRXaWNoVG9QYWRGb3JUZXh0ICh0ZXh0KSB7XG4gICAgaWYgKHRoaXMud2hpY2hUb1BhZCAhPT0gJ2F1dG8nKSByZXR1cm4gdGhpcy53aGljaFRvUGFkXG5cbiAgICBpZiAoL15cXHMqWz18XVxccyokLy50ZXN0KHRleHQpKSB7XG4gICAgICAvLyBBc2lnbm1lbnQoPSkgYW5kIGB8YChtYXJrZG93bi10YWJsZSBzZXBhcmF0b3IpXG4gICAgICByZXR1cm4gJ3N0YXJ0J1xuICAgIH0gZWxzZSBpZiAoL15cXHMqLFxccyokLy50ZXN0KHRleHQpKSB7XG4gICAgICAvLyBBcmd1bWVudHNcbiAgICAgIHJldHVybiAnZW5kJ1xuICAgIH0gZWxzZSBpZiAoL1xcVyQvLnRlc3QodGV4dCkpIHtcbiAgICAgIC8vIGVuZHMgd2l0aCBub24td29yZC1jaGFyXG4gICAgICByZXR1cm4gJ2VuZCdcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdzdGFydCdcbiAgICB9XG4gIH1cblxuICBjYWxjdWxhdGVQYWRkaW5nICgpIHtcbiAgICBjb25zdCB0b3RhbEFtb3VudE9mUGFkZGluZ0J5Um93ID0ge31cbiAgICBjb25zdCBjb2x1bW5Gb3JTZWxlY3Rpb24gPSBzZWxlY3Rpb24gPT4ge1xuICAgICAgY29uc3Qgd2hpY2ggPSB0aGlzLmdldFdpY2hUb1BhZEZvclRleHQoc2VsZWN0aW9uLmdldFRleHQoKSlcbiAgICAgIGNvbnN0IHBvaW50ID0gc2VsZWN0aW9uLmdldEJ1ZmZlclJhbmdlKClbd2hpY2hdXG4gICAgICByZXR1cm4gcG9pbnQuY29sdW1uICsgKHRvdGFsQW1vdW50T2ZQYWRkaW5nQnlSb3dbcG9pbnQucm93XSB8fCAwKVxuICAgIH1cblxuICAgIGNvbnN0IHRha2VTZWxlY3Rpb25zID0gdGhpcy5nZXRTZWxlY3Rpb25UYWtlcigpXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGlvbnMgPSB0YWtlU2VsZWN0aW9ucygpXG4gICAgICBpZiAoIXNlbGVjdGlvbnMubGVuZ3RoKSByZXR1cm5cbiAgICAgIGNvbnN0IG1heENvbHVtbiA9IHNlbGVjdGlvbnMubWFwKGNvbHVtbkZvclNlbGVjdGlvbikucmVkdWNlKChtYXgsIGN1cikgPT4gKGN1ciA+IG1heCA/IGN1ciA6IG1heCkpXG4gICAgICBmb3IgKGNvbnN0IHNlbGVjdGlvbiBvZiBzZWxlY3Rpb25zKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHNlbGVjdGlvbi5nZXRCdWZmZXJSYW5nZSgpLnN0YXJ0LnJvd1xuICAgICAgICBjb25zdCBhbW91bnRPZlBhZGRpbmcgPSBtYXhDb2x1bW4gLSBjb2x1bW5Gb3JTZWxlY3Rpb24oc2VsZWN0aW9uKVxuICAgICAgICB0b3RhbEFtb3VudE9mUGFkZGluZ0J5Um93W3Jvd10gPSAodG90YWxBbW91bnRPZlBhZGRpbmdCeVJvd1tyb3ddIHx8IDApICsgYW1vdW50T2ZQYWRkaW5nXG4gICAgICAgIHRoaXMuYW1vdW50T2ZQYWRkaW5nQnlTZWxlY3Rpb24uc2V0KHNlbGVjdGlvbiwgYW1vdW50T2ZQYWRkaW5nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4ZWN1dGUgKCkge1xuICAgIHRoaXMuYW1vdW50T2ZQYWRkaW5nQnlTZWxlY3Rpb24gPSBuZXcgTWFwKClcbiAgICB0aGlzLm9uRGlkU2VsZWN0VGFyZ2V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlUGFkZGluZygpXG4gICAgfSlcbiAgICBzdXBlci5leGVjdXRlKClcbiAgfVxuXG4gIGdldE5ld1RleHQgKHRleHQsIHNlbGVjdGlvbikge1xuICAgIGNvbnN0IHBhZGRpbmcgPSAnICcucmVwZWF0KHRoaXMuYW1vdW50T2ZQYWRkaW5nQnlTZWxlY3Rpb24uZ2V0KHNlbGVjdGlvbikpXG4gICAgY29uc3Qgd2hpY2hUb1BhZCA9IHRoaXMuZ2V0V2ljaFRvUGFkRm9yVGV4dChzZWxlY3Rpb24uZ2V0VGV4dCgpKVxuICAgIHJldHVybiB3aGljaFRvUGFkID09PSAnc3RhcnQnID8gcGFkZGluZyArIHRleHQgOiB0ZXh0ICsgcGFkZGluZ1xuICB9XG59XG5cbmNsYXNzIEFsaWduT2NjdXJyZW5jZUJ5UGFkTGVmdCBleHRlbmRzIEFsaWduT2NjdXJyZW5jZSB7XG4gIHdoaWNoVG9QYWQgPSAnc3RhcnQnXG59XG5cbmNsYXNzIEFsaWduT2NjdXJyZW5jZUJ5UGFkUmlnaHQgZXh0ZW5kcyBBbGlnbk9jY3VycmVuY2Uge1xuICB3aGljaFRvUGFkID0gJ2VuZCdcbn1cblxuY2xhc3MgUmVtb3ZlTGVhZGluZ1doaXRlU3BhY2VzIGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgd2lzZSA9ICdsaW5ld2lzZSdcbiAgZ2V0TmV3VGV4dCAodGV4dCwgc2VsZWN0aW9uKSB7XG4gICAgY29uc3QgdHJpbUxlZnQgPSB0ZXh0ID0+IHRleHQudHJpbUxlZnQoKVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnV0aWxzXG4gICAgICAgIC5zcGxpdFRleHRCeU5ld0xpbmUodGV4dClcbiAgICAgICAgLm1hcCh0cmltTGVmdClcbiAgICAgICAgLmpvaW4oJ1xcbicpICsgJ1xcbidcbiAgICApXG4gIH1cbn1cblxuY2xhc3MgQ29udmVydFRvU29mdFRhYiBleHRlbmRzIFRyYW5zZm9ybVN0cmluZyB7XG4gIHN0YXRpYyBkaXNwbGF5TmFtZSA9ICdTb2Z0IFRhYidcbiAgd2lzZSA9ICdsaW5ld2lzZSdcblxuICBtdXRhdGVTZWxlY3Rpb24gKHNlbGVjdGlvbikge1xuICAgIHRoaXMuc2NhbkVkaXRvcignZm9yd2FyZCcsIC9cXHQvZywge3NjYW5SYW5nZTogc2VsZWN0aW9uLmdldEJ1ZmZlclJhbmdlKCl9LCAoe3JhbmdlLCByZXBsYWNlfSkgPT4ge1xuICAgICAgLy8gUmVwbGFjZSBcXHQgdG8gc3BhY2VzIHdoaWNoIGxlbmd0aCBpcyB2YXJ5IGRlcGVuZGluZyBvbiB0YWJTdG9wIGFuZCB0YWJMZW5naHRcbiAgICAgIC8vIFNvIHdlIGRpcmVjdGx5IGNvbnN1bHQgaXQncyBzY3JlZW4gcmVwcmVzZW50aW5nIGxlbmd0aC5cbiAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuZWRpdG9yLnNjcmVlblJhbmdlRm9yQnVmZmVyUmFuZ2UocmFuZ2UpLmdldEV4dGVudCgpLmNvbHVtblxuICAgICAgcmVwbGFjZSgnICcucmVwZWF0KGxlbmd0aCkpXG4gICAgfSlcbiAgfVxufVxuXG5jbGFzcyBDb252ZXJ0VG9IYXJkVGFiIGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ0hhcmQgVGFiJ1xuXG4gIG11dGF0ZVNlbGVjdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgY29uc3QgdGFiTGVuZ3RoID0gdGhpcy5lZGl0b3IuZ2V0VGFiTGVuZ3RoKClcbiAgICB0aGlzLnNjYW5FZGl0b3IoJ2ZvcndhcmQnLCAvWyBcXHRdKy9nLCB7c2NhblJhbmdlOiBzZWxlY3Rpb24uZ2V0QnVmZmVyUmFuZ2UoKX0sICh7cmFuZ2UsIHJlcGxhY2V9KSA9PiB7XG4gICAgICBjb25zdCB7c3RhcnQsIGVuZH0gPSB0aGlzLmVkaXRvci5zY3JlZW5SYW5nZUZvckJ1ZmZlclJhbmdlKHJhbmdlKVxuICAgICAgbGV0IHN0YXJ0Q29sdW1uID0gc3RhcnQuY29sdW1uXG4gICAgICBjb25zdCBlbmRDb2x1bW4gPSBlbmQuY29sdW1uXG5cbiAgICAgIC8vIFdlIGNhbid0IG5haXZlbHkgcmVwbGFjZSBzcGFjZXMgdG8gdGFiLCB3ZSBoYXZlIHRvIGNvbnNpZGVyIHZhbGlkIHRhYlN0b3AgY29sdW1uXG4gICAgICAvLyBJZiBuZXh0VGFiU3RvcCBjb2x1bW4gZXhjZWVkcyByZXBsYWNhYmxlIHJhbmdlLCB3ZSBwYWQgd2l0aCBzcGFjZXMuXG4gICAgICBsZXQgbmV3VGV4dCA9ICcnXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCByZW1haW5kZXIgPSBzdGFydENvbHVtbiAlIHRhYkxlbmd0aFxuICAgICAgICBjb25zdCBuZXh0VGFiU3RvcCA9IHN0YXJ0Q29sdW1uICsgKHJlbWFpbmRlciA9PT0gMCA/IHRhYkxlbmd0aCA6IHJlbWFpbmRlcilcbiAgICAgICAgaWYgKG5leHRUYWJTdG9wID4gZW5kQ29sdW1uKSB7XG4gICAgICAgICAgbmV3VGV4dCArPSAnICcucmVwZWF0KGVuZENvbHVtbiAtIHN0YXJ0Q29sdW1uKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1RleHQgKz0gJ1xcdCdcbiAgICAgICAgfVxuICAgICAgICBzdGFydENvbHVtbiA9IG5leHRUYWJTdG9wXG4gICAgICAgIGlmIChzdGFydENvbHVtbiA+PSBlbmRDb2x1bW4pIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlcGxhY2UobmV3VGV4dClcbiAgICB9KVxuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmNsYXNzIFRyYW5zZm9ybVN0cmluZ0J5RXh0ZXJuYWxDb21tYW5kIGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgc3RhdGljIGNvbW1hbmQgPSBmYWxzZVxuICBhdXRvSW5kZW50ID0gdHJ1ZVxuICBjb21tYW5kID0gJycgLy8gZS5nLiBjb21tYW5kOiAnc29ydCdcbiAgYXJncyA9IFtdIC8vIGUuZyBhcmdzOiBbJy1ybiddXG5cbiAgLy8gTk9URTogVW5saWtlIG90aGVyIGNsYXNzLCBmaXJzdCBhcmcgaXMgYHN0ZG91dGAgb2YgZXh0ZXJuYWwgY29tbWFuZHMuXG4gIGdldE5ld1RleHQgKHRleHQsIHNlbGVjdGlvbikge1xuICAgIHJldHVybiB0ZXh0IHx8IHNlbGVjdGlvbi5nZXRUZXh0KClcbiAgfVxuICBnZXRDb21tYW5kIChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4ge2NvbW1hbmQ6IHRoaXMuY29tbWFuZCwgYXJnczogdGhpcy5hcmdzfVxuICB9XG4gIGdldFN0ZGluIChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uLmdldFRleHQoKVxuICB9XG5cbiAgYXN5bmMgZXhlY3V0ZSAoKSB7XG4gICAgdGhpcy5wcmVTZWxlY3QoKVxuXG4gICAgaWYgKHRoaXMuc2VsZWN0VGFyZ2V0KCkpIHtcbiAgICAgIGZvciAoY29uc3Qgc2VsZWN0aW9uIG9mIHRoaXMuZWRpdG9yLmdldFNlbGVjdGlvbnMoKSkge1xuICAgICAgICBjb25zdCB7Y29tbWFuZCwgYXJnc30gPSB0aGlzLmdldENvbW1hbmQoc2VsZWN0aW9uKSB8fCB7fVxuICAgICAgICBpZiAoY29tbWFuZCA9PSBudWxsIHx8IGFyZ3MgPT0gbnVsbCkgY29udGludWVcblxuICAgICAgICBjb25zdCBzdGRvdXQgPSBhd2FpdCB0aGlzLnJ1bkV4dGVybmFsQ29tbWFuZCh7Y29tbWFuZCwgYXJncywgc3RkaW46IHRoaXMuZ2V0U3RkaW4oc2VsZWN0aW9uKX0pXG4gICAgICAgIHNlbGVjdGlvbi5pbnNlcnRUZXh0KHRoaXMuZ2V0TmV3VGV4dChzdGRvdXQsIHNlbGVjdGlvbiksIHthdXRvSW5kZW50OiB0aGlzLmF1dG9JbmRlbnR9KVxuICAgICAgfVxuICAgICAgdGhpcy5tdXRhdGlvbk1hbmFnZXIuc2V0Q2hlY2twb2ludCgnZGlkLWZpbmlzaCcpXG4gICAgICB0aGlzLnJlc3RvcmVDdXJzb3JQb3NpdGlvbnNJZk5lY2Vzc2FyeSgpXG4gICAgfVxuICAgIHRoaXMucG9zdE11dGF0ZSgpXG4gIH1cblxuICBydW5FeHRlcm5hbENvbW1hbmQgKG9wdGlvbnMpIHtcbiAgICBsZXQgb3V0cHV0ID0gJydcbiAgICBvcHRpb25zLnN0ZG91dCA9IGRhdGEgPT4gKG91dHB1dCArPSBkYXRhKVxuICAgIGNvbnN0IGV4aXRQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBvcHRpb25zLmV4aXQgPSAoKSA9PiByZXNvbHZlKG91dHB1dClcbiAgICB9KVxuICAgIGNvbnN0IHtzdGRpbn0gPSBvcHRpb25zXG4gICAgZGVsZXRlIG9wdGlvbnMuc3RkaW5cbiAgICBjb25zdCBidWZmZXJlZFByb2Nlc3MgPSBuZXcgQnVmZmVyZWRQcm9jZXNzKG9wdGlvbnMpXG4gICAgYnVmZmVyZWRQcm9jZXNzLm9uV2lsbFRocm93RXJyb3IoKHtlcnJvciwgaGFuZGxlfSkgPT4ge1xuICAgICAgLy8gU3VwcHJlc3MgY29tbWFuZCBub3QgZm91bmQgZXJyb3IgaW50ZW50aW9uYWxseS5cbiAgICAgIGlmIChlcnJvci5jb2RlID09PSAnRU5PRU5UJyAmJiBlcnJvci5zeXNjYWxsLmluZGV4T2YoJ3NwYXduJykgPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5nZXRDb21tYW5kTmFtZSgpfTogRmFpbGVkIHRvIHNwYXduIGNvbW1hbmQgJHtlcnJvci5wYXRofS5gKVxuICAgICAgICBoYW5kbGUoKVxuICAgICAgfVxuICAgICAgdGhpcy5jYW5jZWxPcGVyYXRpb24oKVxuICAgIH0pXG5cbiAgICBpZiAoc3RkaW4pIHtcbiAgICAgIGJ1ZmZlcmVkUHJvY2Vzcy5wcm9jZXNzLnN0ZGluLndyaXRlKHN0ZGluKVxuICAgICAgYnVmZmVyZWRQcm9jZXNzLnByb2Nlc3Muc3RkaW4uZW5kKClcbiAgICB9XG4gICAgcmV0dXJuIGV4aXRQcm9taXNlXG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuY2xhc3MgVHJhbnNmb3JtU3RyaW5nQnlTZWxlY3RMaXN0IGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgdGFyZ2V0ID0gJ0VtcHR5J1xuICByZWNvcmRhYmxlID0gZmFsc2VcblxuICBzdGF0aWMgZ2V0U2VsZWN0TGlzdEl0ZW1zICgpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0TGlzdEl0ZW1zKSB7XG4gICAgICB0aGlzLnNlbGVjdExpc3RJdGVtcyA9IHRoaXMuc3RyaW5nVHJhbnNmb3JtZXJzLm1hcChrbGFzcyA9PiB7XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IGtsYXNzLmhhc093blByb3BlcnR5KCdkaXNwbGF5TmFtZVN1ZmZpeCcpID8gJyAnICsga2xhc3MuZGlzcGxheU5hbWVTdWZmaXggOiAnJ1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAga2xhc3M6IGtsYXNzLFxuICAgICAgICAgIGRpc3BsYXlOYW1lOiBrbGFzcy5oYXNPd25Qcm9wZXJ0eSgnZGlzcGxheU5hbWUnKVxuICAgICAgICAgICAgPyBrbGFzcy5kaXNwbGF5TmFtZSArIHN1ZmZpeFxuICAgICAgICAgICAgOiB0aGlzLl8uaHVtYW5pemVFdmVudE5hbWUodGhpcy5fLmRhc2hlcml6ZShrbGFzcy5uYW1lKSkgKyBzdWZmaXhcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TGlzdEl0ZW1zXG4gIH1cblxuICBzZWxlY3RJdGVtcyAoKSB7XG4gICAgaWYgKCFzZWxlY3RMaXN0KSB7XG4gICAgICBjb25zdCBTZWxlY3RMaXN0ID0gcmVxdWlyZSgnLi9zZWxlY3QtbGlzdCcpXG4gICAgICBzZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0TGlzdC5zZWxlY3RGcm9tSXRlbXModGhpcy5jb25zdHJ1Y3Rvci5nZXRTZWxlY3RMaXN0SXRlbXMoKSlcbiAgfVxuXG4gIGFzeW5jIGV4ZWN1dGUgKCkge1xuICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCB0aGlzLnNlbGVjdEl0ZW1zKClcbiAgICBpZiAoaXRlbSkge1xuICAgICAgdGhpcy52aW1TdGF0ZS5vcGVyYXRpb25TdGFjay5ydW5OZXh0KGl0ZW0ua2xhc3MsIHt0YXJnZXQ6IHRoaXMubmV4dFRhcmdldH0pXG4gICAgfVxuICB9XG59XG5cbmNsYXNzIFRyYW5zZm9ybVdvcmRCeVNlbGVjdExpc3QgZXh0ZW5kcyBUcmFuc2Zvcm1TdHJpbmdCeVNlbGVjdExpc3Qge1xuICBuZXh0VGFyZ2V0ID0gJ0lubmVyV29yZCdcbn1cblxuY2xhc3MgVHJhbnNmb3JtU21hcnRXb3JkQnlTZWxlY3RMaXN0IGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nQnlTZWxlY3RMaXN0IHtcbiAgbmV4dFRhcmdldCA9ICdJbm5lclNtYXJ0V29yZCdcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuY2xhc3MgUmVwbGFjZVdpdGhSZWdpc3RlciBleHRlbmRzIFRyYW5zZm9ybVN0cmluZyB7XG4gIGZsYXNoVHlwZSA9ICdvcGVyYXRvci1sb25nJ1xuXG4gIGluaXRpYWxpemUgKCkge1xuICAgIHRoaXMudmltU3RhdGUuc2VxdWVudGlhbFBhc3RlTWFuYWdlci5vbkluaXRpYWxpemUodGhpcylcbiAgICBzdXBlci5pbml0aWFsaXplKClcbiAgfVxuXG4gIGV4ZWN1dGUgKCkge1xuICAgIHRoaXMuc2VxdWVudGlhbFBhc3RlID0gdGhpcy52aW1TdGF0ZS5zZXF1ZW50aWFsUGFzdGVNYW5hZ2VyLm9uRXhlY3V0ZSh0aGlzKVxuXG4gICAgc3VwZXIuZXhlY3V0ZSgpXG5cbiAgICBmb3IgKGNvbnN0IHNlbGVjdGlvbiBvZiB0aGlzLmVkaXRvci5nZXRTZWxlY3Rpb25zKCkpIHtcbiAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5tdXRhdGlvbk1hbmFnZXIuZ2V0TXV0YXRlZEJ1ZmZlclJhbmdlRm9yU2VsZWN0aW9uKHNlbGVjdGlvbilcbiAgICAgIHRoaXMudmltU3RhdGUuc2VxdWVudGlhbFBhc3RlTWFuYWdlci5zYXZlUGFzdGVkUmFuZ2VGb3JTZWxlY3Rpb24oc2VsZWN0aW9uLCByYW5nZSlcbiAgICB9XG4gIH1cblxuICBnZXROZXdUZXh0ICh0ZXh0LCBzZWxlY3Rpb24pIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmltU3RhdGUucmVnaXN0ZXIuZ2V0KG51bGwsIHNlbGVjdGlvbiwgdGhpcy5zZXF1ZW50aWFsUGFzdGUpXG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUudGV4dCA6ICcnXG4gIH1cbn1cblxuY2xhc3MgUmVwbGFjZU9jY3VycmVuY2VXaXRoUmVnaXN0ZXIgZXh0ZW5kcyBSZXBsYWNlV2l0aFJlZ2lzdGVyIHtcbiAgb2NjdXJyZW5jZSA9IHRydWVcbn1cblxuLy8gU2F2ZSB0ZXh0IHRvIHJlZ2lzdGVyIGJlZm9yZSByZXBsYWNlXG5jbGFzcyBTd2FwV2l0aFJlZ2lzdGVyIGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgZ2V0TmV3VGV4dCAodGV4dCwgc2VsZWN0aW9uKSB7XG4gICAgY29uc3QgbmV3VGV4dCA9IHRoaXMudmltU3RhdGUucmVnaXN0ZXIuZ2V0VGV4dCgpXG4gICAgdGhpcy5zZXRUZXh0VG9SZWdpc3Rlcih0ZXh0LCBzZWxlY3Rpb24pXG4gICAgcmV0dXJuIG5ld1RleHRcbiAgfVxufVxuXG4vLyBJbmRlbnQgPCBUcmFuc2Zvcm1TdHJpbmdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmNsYXNzIEluZGVudCBleHRlbmRzIFRyYW5zZm9ybVN0cmluZyB7XG4gIHN0YXlCeU1hcmtlciA9IHRydWVcbiAgc2V0VG9GaXJzdENoYXJhY3Rlck9uTGluZXdpc2UgPSB0cnVlXG4gIHdpc2UgPSAnbGluZXdpc2UnXG5cbiAgbXV0YXRlU2VsZWN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAvLyBOZWVkIGNvdW50IHRpbWVzIGluZGVudGF0aW9uIGluIHZpc3VhbC1tb2RlIGFuZCBpdHMgcmVwZWF0KGAuYCkuXG4gICAgaWYgKHRoaXMudGFyZ2V0Lm5hbWUgPT09ICdDdXJyZW50U2VsZWN0aW9uJykge1xuICAgICAgbGV0IG9sZFRleHRcbiAgICAgIC8vIGxpbWl0IHRvIDEwMCB0byBhdm9pZCBmcmVlemluZyBieSBhY2NpZGVudGFsIGJpZyBudW1iZXIuXG4gICAgICB0aGlzLmNvdW50VGltZXModGhpcy5saW1pdE51bWJlcih0aGlzLmdldENvdW50KCksIHttYXg6IDEwMH0pLCAoe3N0b3B9KSA9PiB7XG4gICAgICAgIG9sZFRleHQgPSBzZWxlY3Rpb24uZ2V0VGV4dCgpXG4gICAgICAgIHRoaXMuaW5kZW50KHNlbGVjdGlvbilcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5nZXRUZXh0KCkgPT09IG9sZFRleHQpIHN0b3AoKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRlbnQoc2VsZWN0aW9uKVxuICAgIH1cbiAgfVxuXG4gIGluZGVudCAoc2VsZWN0aW9uKSB7XG4gICAgc2VsZWN0aW9uLmluZGVudFNlbGVjdGVkUm93cygpXG4gIH1cbn1cblxuY2xhc3MgT3V0ZGVudCBleHRlbmRzIEluZGVudCB7XG4gIGluZGVudCAoc2VsZWN0aW9uKSB7XG4gICAgc2VsZWN0aW9uLm91dGRlbnRTZWxlY3RlZFJvd3MoKVxuICB9XG59XG5cbmNsYXNzIEF1dG9JbmRlbnQgZXh0ZW5kcyBJbmRlbnQge1xuICBpbmRlbnQgKHNlbGVjdGlvbikge1xuICAgIHNlbGVjdGlvbi5hdXRvSW5kZW50U2VsZWN0ZWRSb3dzKClcbiAgfVxufVxuXG5jbGFzcyBUb2dnbGVMaW5lQ29tbWVudHMgZXh0ZW5kcyBUcmFuc2Zvcm1TdHJpbmcge1xuICBmbGFzaFRhcmdldCA9IGZhbHNlXG4gIHN0YXlCeU1hcmtlciA9IHRydWVcbiAgc3RheUF0U2FtZVBvc2l0aW9uID0gdHJ1ZVxuICB3aXNlID0gJ2xpbmV3aXNlJ1xuXG4gIG11dGF0ZVNlbGVjdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgc2VsZWN0aW9uLnRvZ2dsZUxpbmVDb21tZW50cygpXG4gIH1cbn1cblxuY2xhc3MgUmVmbG93IGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgbXV0YXRlU2VsZWN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHRoaXMuZWRpdG9yRWxlbWVudCwgJ2F1dG9mbG93OnJlZmxvdy1zZWxlY3Rpb24nKVxuICB9XG59XG5cbmNsYXNzIFJlZmxvd1dpdGhTdGF5IGV4dGVuZHMgUmVmbG93IHtcbiAgc3RheUF0U2FtZVBvc2l0aW9uID0gdHJ1ZVxufVxuXG4vLyBTdXJyb3VuZCA8IFRyYW5zZm9ybVN0cmluZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuY2xhc3MgU3Vycm91bmRCYXNlIGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgc3RhdGljIGNvbW1hbmQgPSBmYWxzZVxuICBzdXJyb3VuZEFjdGlvbiA9IG51bGxcbiAgcGFpcnMgPSBbWycoJywgJyknXSwgWyd7JywgJ30nXSwgWydbJywgJ10nXSwgWyc8JywgJz4nXV1cbiAgcGFpcnNCeUFsaWFzID0ge1xuICAgIGI6IFsnKCcsICcpJ10sXG4gICAgQjogWyd7JywgJ30nXSxcbiAgICByOiBbJ1snLCAnXSddLFxuICAgIGE6IFsnPCcsICc+J11cbiAgfVxuXG4gIGluaXRpYWxpemUgKCkge1xuICAgIHRoaXMucmVwbGFjZUJ5RGlmZiA9IHRoaXMuZ2V0Q29uZmlnKCdyZXBsYWNlQnlEaWZmT25TdXJyb3VuZCcpXG4gICAgdGhpcy5zdGF5QnlNYXJrZXIgPSB0aGlzLnJlcGxhY2VCeURpZmZcbiAgICBzdXBlci5pbml0aWFsaXplKClcbiAgfVxuXG4gIGdldFBhaXIgKGNoYXIpIHtcbiAgICByZXR1cm4gY2hhciBpbiB0aGlzLnBhaXJzQnlBbGlhc1xuICAgICAgPyB0aGlzLnBhaXJzQnlBbGlhc1tjaGFyXVxuICAgICAgOiBbLi4udGhpcy5wYWlycywgW2NoYXIsIGNoYXJdXS5maW5kKHBhaXIgPT4gcGFpci5pbmNsdWRlcyhjaGFyKSlcbiAgfVxuXG4gIHN1cnJvdW5kICh0ZXh0LCBjaGFyLCB7a2VlcExheW91dCA9IGZhbHNlLCBzZWxlY3Rpb259ID0ge30pIHtcbiAgICBsZXQgW29wZW4sIGNsb3NlXSA9IHRoaXMuZ2V0UGFpcihjaGFyKVxuICAgIGlmICgha2VlcExheW91dCAmJiB0ZXh0LmVuZHNXaXRoKCdcXG4nKSkge1xuICAgICAgY29uc3QgYmFzZUluZGVudExldmVsID0gdGhpcy5lZGl0b3IuaW5kZW50YXRpb25Gb3JCdWZmZXJSb3coc2VsZWN0aW9uLmdldEJ1ZmZlclJhbmdlKCkuc3RhcnQucm93KVxuICAgICAgY29uc3QgaW5kZW50VGV4dFN0YXJ0Um93ID0gdGhpcy5lZGl0b3IuYnVpbGRJbmRlbnRTdHJpbmcoYmFzZUluZGVudExldmVsKVxuICAgICAgY29uc3QgaW5kZW50VGV4dE9uZUxldmVsID0gdGhpcy5lZGl0b3IuYnVpbGRJbmRlbnRTdHJpbmcoMSlcblxuICAgICAgb3BlbiA9IGluZGVudFRleHRTdGFydFJvdyArIG9wZW4gKyAnXFxuJ1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXiguKykkL2dtLCBtID0+IGluZGVudFRleHRPbmVMZXZlbCArIG0pXG4gICAgICBjbG9zZSA9IGluZGVudFRleHRTdGFydFJvdyArIGNsb3NlICsgJ1xcbidcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXRDb25maWcoJ2NoYXJhY3RlcnNUb0FkZFNwYWNlT25TdXJyb3VuZCcpLmluY2x1ZGVzKGNoYXIpICYmIHRoaXMudXRpbHMuaXNTaW5nbGVMaW5lVGV4dCh0ZXh0KSkge1xuICAgICAgdGV4dCA9ICcgJyArIHRleHQgKyAnICdcbiAgICB9XG5cbiAgICByZXR1cm4gb3BlbiArIHRleHQgKyBjbG9zZVxuICB9XG5cbiAgZGVsZXRlU3Vycm91bmQgKHRleHQpIHtcbiAgICAvLyBBc3N1bWUgc3Vycm91bmRpbmcgY2hhciBpcyBvbmUtY2hhciBsZW5ndGguXG4gICAgY29uc3Qgb3BlbiA9IHRleHRbMF1cbiAgICBjb25zdCBjbG9zZSA9IHRleHRbdGV4dC5sZW5ndGggLSAxXVxuICAgIGNvbnN0IGlubmVyVGV4dCA9IHRleHQuc2xpY2UoMSwgdGV4dC5sZW5ndGggLSAxKVxuICAgIHJldHVybiB0aGlzLnV0aWxzLmlzU2luZ2xlTGluZVRleHQodGV4dCkgJiYgb3BlbiAhPT0gY2xvc2UgPyBpbm5lclRleHQudHJpbSgpIDogaW5uZXJUZXh0XG4gIH1cblxuICBnZXROZXdUZXh0ICh0ZXh0LCBzZWxlY3Rpb24pIHtcbiAgICBpZiAodGhpcy5zdXJyb3VuZEFjdGlvbiA9PT0gJ3N1cnJvdW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMuc3Vycm91bmQodGV4dCwgdGhpcy5pbnB1dCwge3NlbGVjdGlvbn0pXG4gICAgfSBlbHNlIGlmICh0aGlzLnN1cnJvdW5kQWN0aW9uID09PSAnZGVsZXRlLXN1cnJvdW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlU3Vycm91bmQodGV4dClcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3Vycm91bmRBY3Rpb24gPT09ICdjaGFuZ2Utc3Vycm91bmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdXJyb3VuZCh0aGlzLmRlbGV0ZVN1cnJvdW5kKHRleHQpLCB0aGlzLmlucHV0LCB7a2VlcExheW91dDogdHJ1ZX0pXG4gICAgfVxuICB9XG59XG5cbmNsYXNzIFN1cnJvdW5kIGV4dGVuZHMgU3Vycm91bmRCYXNlIHtcbiAgc3Vycm91bmRBY3Rpb24gPSAnc3Vycm91bmQnXG4gIHJlYWRJbnB1dEFmdGVyU2VsZWN0ID0gdHJ1ZVxufVxuXG5jbGFzcyBTdXJyb3VuZFdvcmQgZXh0ZW5kcyBTdXJyb3VuZCB7XG4gIHRhcmdldCA9ICdJbm5lcldvcmQnXG59XG5cbmNsYXNzIFN1cnJvdW5kU21hcnRXb3JkIGV4dGVuZHMgU3Vycm91bmQge1xuICB0YXJnZXQgPSAnSW5uZXJTbWFydFdvcmQnXG59XG5cbmNsYXNzIE1hcFN1cnJvdW5kIGV4dGVuZHMgU3Vycm91bmQge1xuICBvY2N1cnJlbmNlID0gdHJ1ZVxuICBwYXR0ZXJuRm9yT2NjdXJyZW5jZSA9IC9cXHcrL2dcbn1cblxuLy8gRGVsZXRlIFN1cnJvdW5kXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5jbGFzcyBEZWxldGVTdXJyb3VuZCBleHRlbmRzIFN1cnJvdW5kQmFzZSB7XG4gIHN1cnJvdW5kQWN0aW9uID0gJ2RlbGV0ZS1zdXJyb3VuZCdcbiAgaW5pdGlhbGl6ZSAoKSB7XG4gICAgaWYgKCF0aGlzLnRhcmdldCkge1xuICAgICAgdGhpcy5mb2N1c0lucHV0KHtcbiAgICAgICAgb25Db25maXJtOiBjaGFyID0+IHtcbiAgICAgICAgICB0aGlzLnNldFRhcmdldCh0aGlzLmdldEluc3RhbmNlKCdBUGFpcicsIHtwYWlyOiB0aGlzLmdldFBhaXIoY2hhcil9KSlcbiAgICAgICAgICB0aGlzLnByb2Nlc3NPcGVyYXRpb24oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBzdXBlci5pbml0aWFsaXplKClcbiAgfVxufVxuXG5jbGFzcyBEZWxldGVTdXJyb3VuZEFueVBhaXIgZXh0ZW5kcyBEZWxldGVTdXJyb3VuZCB7XG4gIHRhcmdldCA9ICdBQW55UGFpcidcbn1cblxuY2xhc3MgRGVsZXRlU3Vycm91bmRBbnlQYWlyQWxsb3dGb3J3YXJkaW5nIGV4dGVuZHMgRGVsZXRlU3Vycm91bmRBbnlQYWlyIHtcbiAgdGFyZ2V0ID0gJ0FBbnlQYWlyQWxsb3dGb3J3YXJkaW5nJ1xufVxuXG4vLyBDaGFuZ2UgU3Vycm91bmRcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmNsYXNzIENoYW5nZVN1cnJvdW5kIGV4dGVuZHMgRGVsZXRlU3Vycm91bmQge1xuICBzdXJyb3VuZEFjdGlvbiA9ICdjaGFuZ2Utc3Vycm91bmQnXG4gIHJlYWRJbnB1dEFmdGVyU2VsZWN0ID0gdHJ1ZVxuXG4gIC8vIE92ZXJyaWRlIHRvIHNob3cgY2hhbmdpbmcgY2hhciBvbiBob3ZlclxuICBhc3luYyBmb2N1c0lucHV0UHJvbWlzZWQgKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBob3ZlclBvaW50ID0gdGhpcy5tdXRhdGlvbk1hbmFnZXIuZ2V0SW5pdGlhbFBvaW50Rm9yU2VsZWN0aW9uKHRoaXMuZWRpdG9yLmdldExhc3RTZWxlY3Rpb24oKSlcbiAgICB0aGlzLnZpbVN0YXRlLmhvdmVyLnNldCh0aGlzLmVkaXRvci5nZXRTZWxlY3RlZFRleHQoKVswXSwgaG92ZXJQb2ludClcbiAgICByZXR1cm4gc3VwZXIuZm9jdXNJbnB1dFByb21pc2VkKC4uLmFyZ3MpXG4gIH1cbn1cblxuY2xhc3MgQ2hhbmdlU3Vycm91bmRBbnlQYWlyIGV4dGVuZHMgQ2hhbmdlU3Vycm91bmQge1xuICB0YXJnZXQgPSAnQUFueVBhaXInXG59XG5cbmNsYXNzIENoYW5nZVN1cnJvdW5kQW55UGFpckFsbG93Rm9yd2FyZGluZyBleHRlbmRzIENoYW5nZVN1cnJvdW5kQW55UGFpciB7XG4gIHRhcmdldCA9ICdBQW55UGFpckFsbG93Rm9yd2FyZGluZydcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRklYTUVcbi8vIEN1cnJlbnRseSBuYXRpdmUgZWRpdG9yLmpvaW5MaW5lcygpIGlzIGJldHRlciBmb3IgY3Vyc29yIHBvc2l0aW9uIHNldHRpbmdcbi8vIFNvIEkgdXNlIG5hdGl2ZSBtZXRob2RzIGZvciBhIG1lYW53aGlsZS5cbmNsYXNzIEpvaW5UYXJnZXQgZXh0ZW5kcyBUcmFuc2Zvcm1TdHJpbmcge1xuICBmbGFzaFRhcmdldCA9IGZhbHNlXG4gIHJlc3RvcmVQb3NpdGlvbnMgPSBmYWxzZVxuXG4gIG11dGF0ZVNlbGVjdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0QnVmZmVyUmFuZ2UoKVxuXG4gICAgLy8gV2hlbiBjdXJzb3IgaXMgYXQgbGFzdCBCVUZGRVIgcm93LCBpdCBzZWxlY3QgbGFzdC1idWZmZXItcm93LCB0aGVuXG4gICAgLy8gam9pbm5pbmcgcmVzdWx0IGluIFwiY2xlYXIgbGFzdC1idWZmZXItcm93IHRleHRcIi5cbiAgICAvLyBJIGJlbGlldmUgdGhpcyBpcyBCVUcgb2YgdXBzdHJlYW0gYXRvbS1jb3JlLiBndWFyZCB0aGlzIHNpdHVhdGlvbiBoZXJlXG4gICAgaWYgKCFyYW5nZS5pc1NpbmdsZUxpbmUoKSB8fCByYW5nZS5lbmQucm93ICE9PSB0aGlzLmVkaXRvci5nZXRMYXN0QnVmZmVyUm93KCkpIHtcbiAgICAgIGlmICh0aGlzLnV0aWxzLmlzTGluZXdpc2VSYW5nZShyYW5nZSkpIHtcbiAgICAgICAgc2VsZWN0aW9uLnNldEJ1ZmZlclJhbmdlKHJhbmdlLnRyYW5zbGF0ZShbMCwgMF0sIFstMSwgSW5maW5pdHldKSlcbiAgICAgIH1cbiAgICAgIHNlbGVjdGlvbi5qb2luTGluZXMoKVxuICAgIH1cbiAgICBjb25zdCBwb2ludCA9IHNlbGVjdGlvbi5nZXRCdWZmZXJSYW5nZSgpLmVuZC50cmFuc2xhdGUoWzAsIC0xXSlcbiAgICByZXR1cm4gc2VsZWN0aW9uLmN1cnNvci5zZXRCdWZmZXJQb3NpdGlvbihwb2ludClcbiAgfVxufVxuXG5jbGFzcyBKb2luIGV4dGVuZHMgSm9pblRhcmdldCB7XG4gIHRhcmdldCA9ICdNb3ZlVG9SZWxhdGl2ZUxpbmUnXG59XG5cbmNsYXNzIEpvaW5CYXNlIGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgc3RhdGljIGNvbW1hbmQgPSBmYWxzZVxuICB3aXNlID0gJ2xpbmV3aXNlJ1xuICB0cmltID0gZmFsc2VcbiAgdGFyZ2V0ID0gJ01vdmVUb1JlbGF0aXZlTGluZU1pbmltdW1Ud28nXG5cbiAgZ2V0TmV3VGV4dCAodGV4dCkge1xuICAgIGNvbnN0IHJlZ2V4ID0gdGhpcy50cmltID8gL1xccj9cXG5bIFxcdF0qL2cgOiAvXFxyP1xcbi9nXG4gICAgcmV0dXJuIHRleHQudHJpbVJpZ2h0KCkucmVwbGFjZShyZWdleCwgdGhpcy5pbnB1dCkgKyAnXFxuJ1xuICB9XG59XG5cbmNsYXNzIEpvaW5XaXRoS2VlcGluZ1NwYWNlIGV4dGVuZHMgSm9pbkJhc2Uge1xuICBpbnB1dCA9ICcnXG59XG5cbmNsYXNzIEpvaW5CeUlucHV0IGV4dGVuZHMgSm9pbkJhc2Uge1xuICByZWFkSW5wdXRBZnRlclNlbGVjdCA9IHRydWVcbiAgZm9jdXNJbnB1dE9wdGlvbnMgPSB7Y2hhcnNNYXg6IDEwfVxuICB0cmltID0gdHJ1ZVxufVxuXG5jbGFzcyBKb2luQnlJbnB1dFdpdGhLZWVwaW5nU3BhY2UgZXh0ZW5kcyBKb2luQnlJbnB1dCB7XG4gIHRyaW0gPSBmYWxzZVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTdHJpbmcgc3VmZml4IGluIG5hbWUgaXMgdG8gYXZvaWQgY29uZnVzaW9uIHdpdGggJ3NwbGl0JyB3aW5kb3cuXG5jbGFzcyBTcGxpdFN0cmluZyBleHRlbmRzIFRyYW5zZm9ybVN0cmluZyB7XG4gIHRhcmdldCA9ICdNb3ZlVG9SZWxhdGl2ZUxpbmUnXG4gIGtlZXBTcGxpdHRlciA9IGZhbHNlXG4gIHJlYWRJbnB1dEFmdGVyU2VsZWN0ID0gdHJ1ZVxuICBmb2N1c0lucHV0T3B0aW9ucyA9IHtjaGFyc01heDogMTB9XG5cbiAgZ2V0TmV3VGV4dCAodGV4dCkge1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLl8uZXNjYXBlUmVnRXhwKHRoaXMuaW5wdXQgfHwgJ1xcXFxuJyksICdnJylcbiAgICBjb25zdCBsaW5lU2VwYXJhdG9yID0gKHRoaXMua2VlcFNwbGl0dGVyID8gdGhpcy5pbnB1dCA6ICcnKSArICdcXG4nXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShyZWdleCwgbGluZVNlcGFyYXRvcilcbiAgfVxufVxuXG5jbGFzcyBTcGxpdFN0cmluZ1dpdGhLZWVwaW5nU3BsaXR0ZXIgZXh0ZW5kcyBTcGxpdFN0cmluZyB7XG4gIGtlZXBTcGxpdHRlciA9IHRydWVcbn1cblxuY2xhc3MgU3BsaXRBcmd1bWVudHMgZXh0ZW5kcyBUcmFuc2Zvcm1TdHJpbmcge1xuICBrZWVwU2VwYXJhdG9yID0gdHJ1ZVxuXG4gIGdldE5ld1RleHQgKHRleHQsIHNlbGVjdGlvbikge1xuICAgIGNvbnN0IGFsbFRva2VucyA9IHRoaXMudXRpbHMuc3BsaXRBcmd1bWVudHModGV4dC50cmltKCkpXG4gICAgbGV0IG5ld1RleHQgPSAnJ1xuXG4gICAgY29uc3QgYmFzZUluZGVudExldmVsID0gdGhpcy5lZGl0b3IuaW5kZW50YXRpb25Gb3JCdWZmZXJSb3coc2VsZWN0aW9uLmdldEJ1ZmZlclJhbmdlKCkuc3RhcnQucm93KVxuICAgIGNvbnN0IGluZGVudFRleHRTdGFydFJvdyA9IHRoaXMuZWRpdG9yLmJ1aWxkSW5kZW50U3RyaW5nKGJhc2VJbmRlbnRMZXZlbClcbiAgICBjb25zdCBpbmRlbnRUZXh0SW5uZXJSb3dzID0gdGhpcy5lZGl0b3IuYnVpbGRJbmRlbnRTdHJpbmcoYmFzZUluZGVudExldmVsICsgMSlcblxuICAgIHdoaWxlIChhbGxUb2tlbnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCB7dGV4dCwgdHlwZX0gPSBhbGxUb2tlbnMuc2hpZnQoKVxuICAgICAgbmV3VGV4dCArPSB0eXBlID09PSAnc2VwYXJhdG9yJyA/ICh0aGlzLmtlZXBTZXBhcmF0b3IgPyB0ZXh0LnRyaW0oKSA6ICcnKSArICdcXG4nIDogaW5kZW50VGV4dElubmVyUm93cyArIHRleHRcbiAgICB9XG4gICAgcmV0dXJuIGBcXG4ke25ld1RleHR9XFxuJHtpbmRlbnRUZXh0U3RhcnRSb3d9YFxuICB9XG59XG5cbmNsYXNzIFNwbGl0QXJndW1lbnRzV2l0aFJlbW92ZVNlcGFyYXRvciBleHRlbmRzIFNwbGl0QXJndW1lbnRzIHtcbiAga2VlcFNlcGFyYXRvciA9IGZhbHNlXG59XG5cbmNsYXNzIFNwbGl0QXJndW1lbnRzT2ZJbm5lckFueVBhaXIgZXh0ZW5kcyBTcGxpdEFyZ3VtZW50cyB7XG4gIHRhcmdldCA9ICdJbm5lckFueVBhaXInXG59XG5cbmNsYXNzIENoYW5nZU9yZGVyIGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgc3RhdGljIGNvbW1hbmQgPSBmYWxzZVxuICBhY3Rpb24gPSBudWxsXG4gIHNvcnRCeSA9IG51bGxcblxuICBnZXROZXdUZXh0ICh0ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0LmlzTGluZXdpc2UoKVxuICAgICAgPyB0aGlzLmdldE5ld0xpc3QodGhpcy51dGlscy5zcGxpdFRleHRCeU5ld0xpbmUodGV4dCkpLmpvaW4oJ1xcbicpICsgJ1xcbidcbiAgICAgIDogdGhpcy5zb3J0QXJndW1lbnRzSW5UZXh0QnkodGV4dCwgYXJncyA9PiB0aGlzLmdldE5ld0xpc3QoYXJncykpXG4gIH1cblxuICBnZXROZXdMaXN0IChyb3dzKSB7XG4gICAgaWYgKHJvd3MubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gW3RoaXMudXRpbHMuY2hhbmdlQ2hhck9yZGVyKHJvd3NbMF0sIHRoaXMuYWN0aW9uLCB0aGlzLnNvcnRCeSldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnV0aWxzLmNoYW5nZUFycmF5T3JkZXIocm93cywgdGhpcy5hY3Rpb24sIHRoaXMuc29ydEJ5KVxuICAgIH1cbiAgfVxuXG4gIHNvcnRBcmd1bWVudHNJblRleHRCeSAodGV4dCwgZm4pIHtcbiAgICBjb25zdCBzdGFydCA9IHRleHQuc2VhcmNoKC9cXFMvKVxuICAgIGNvbnN0IGVuZCA9IHRleHQuc2VhcmNoKC9cXHMqJC8pXG4gICAgY29uc3QgbGVhZGluZ1NwYWNlcyA9IHN0YXJ0ICE9PSAtMSA/IHRleHQuc2xpY2UoMCwgc3RhcnQpIDogJydcbiAgICBjb25zdCB0cmFpbGluZ1NwYWNlcyA9IGVuZCAhPT0gLTEgPyB0ZXh0LnNsaWNlKGVuZCkgOiAnJ1xuICAgIGNvbnN0IGFsbFRva2VucyA9IHRoaXMudXRpbHMuc3BsaXRBcmd1bWVudHModGV4dC5zbGljZShzdGFydCwgZW5kKSlcbiAgICBjb25zdCBhcmdzID0gYWxsVG9rZW5zLmZpbHRlcih0b2tlbiA9PiB0b2tlbi50eXBlID09PSAnYXJndW1lbnQnKS5tYXAodG9rZW4gPT4gdG9rZW4udGV4dClcbiAgICBjb25zdCBuZXdBcmdzID0gZm4oYXJncylcblxuICAgIGxldCBuZXdUZXh0ID0gJydcbiAgICB3aGlsZSAoYWxsVG9rZW5zLmxlbmd0aCkge1xuICAgICAgY29uc3QgdG9rZW4gPSBhbGxUb2tlbnMuc2hpZnQoKVxuICAgICAgLy8gdG9rZW4udHlwZSBpcyBcInNlcGFyYXRvclwiIG9yIFwiYXJndW1lbnRcIlxuICAgICAgbmV3VGV4dCArPSB0b2tlbi50eXBlID09PSAnc2VwYXJhdG9yJyA/IHRva2VuLnRleHQgOiBuZXdBcmdzLnNoaWZ0KClcbiAgICB9XG4gICAgcmV0dXJuIGxlYWRpbmdTcGFjZXMgKyBuZXdUZXh0ICsgdHJhaWxpbmdTcGFjZXNcbiAgfVxufVxuXG5jbGFzcyBSZXZlcnNlIGV4dGVuZHMgQ2hhbmdlT3JkZXIge1xuICBhY3Rpb24gPSAncmV2ZXJzZSdcbn1cblxuY2xhc3MgUmV2ZXJzZUlubmVyQW55UGFpciBleHRlbmRzIFJldmVyc2Uge1xuICB0YXJnZXQgPSAnSW5uZXJBbnlQYWlyJ1xufVxuXG5jbGFzcyBSb3RhdGUgZXh0ZW5kcyBDaGFuZ2VPcmRlciB7XG4gIGFjdGlvbiA9ICdyb3RhdGUtbGVmdCdcbn1cblxuY2xhc3MgUm90YXRlQmFja3dhcmRzIGV4dGVuZHMgQ2hhbmdlT3JkZXIge1xuICBhY3Rpb24gPSAncm90YXRlLXJpZ2h0J1xufVxuXG5jbGFzcyBSb3RhdGVBcmd1bWVudHNPZklubmVyUGFpciBleHRlbmRzIFJvdGF0ZSB7XG4gIHRhcmdldCA9ICdJbm5lckFueVBhaXInXG59XG5cbmNsYXNzIFJvdGF0ZUFyZ3VtZW50c0JhY2t3YXJkc09mSW5uZXJQYWlyIGV4dGVuZHMgUm90YXRlQmFja3dhcmRzIHtcbiAgdGFyZ2V0ID0gJ0lubmVyQW55UGFpcidcbn1cblxuY2xhc3MgU29ydCBleHRlbmRzIENoYW5nZU9yZGVyIHtcbiAgYWN0aW9uID0gJ3NvcnQnXG59XG5cbmNsYXNzIFNvcnRDYXNlSW5zZW5zaXRpdmVseSBleHRlbmRzIFNvcnQge1xuICBzb3J0QnkgPSAocm93QSwgcm93QikgPT4gcm93QS5sb2NhbGVDb21wYXJlKHJvd0IsIHtzZW5zaXRpdml0eTogJ2Jhc2UnfSlcbn1cblxuY2xhc3MgU29ydEJ5TnVtYmVyIGV4dGVuZHMgU29ydCB7XG4gIHNvcnRCeSA9IChyb3dBLCByb3dCKSA9PiAoTnVtYmVyLnBhcnNlSW50KHJvd0EpIHx8IEluZmluaXR5KSAtIChOdW1iZXIucGFyc2VJbnQocm93QikgfHwgSW5maW5pdHkpXG59XG5cbmNsYXNzIE51bWJlcmluZ0xpbmVzIGV4dGVuZHMgVHJhbnNmb3JtU3RyaW5nIHtcbiAgd2lzZSA9ICdsaW5ld2lzZSdcblxuICBnZXROZXdUZXh0ICh0ZXh0KSB7XG4gICAgY29uc3Qgcm93cyA9IHRoaXMudXRpbHMuc3BsaXRUZXh0QnlOZXdMaW5lKHRleHQpXG4gICAgY29uc3QgbGFzdFJvd1dpZHRoID0gU3RyaW5nKHJvd3MubGVuZ3RoKS5sZW5ndGhcblxuICAgIGNvbnN0IG5ld1Jvd3MgPSByb3dzLm1hcCgocm93VGV4dCwgaSkgPT4ge1xuICAgICAgaSsrIC8vIGZpeCAwIHN0YXJ0IGluZGV4IHRvIDEgc3RhcnQuXG4gICAgICBjb25zdCBhbW91bnRPZlBhZGRpbmcgPSB0aGlzLmxpbWl0TnVtYmVyKGxhc3RSb3dXaWR0aCAtIFN0cmluZyhpKS5sZW5ndGgsIHttaW46IDB9KVxuICAgICAgcmV0dXJuICcgJy5yZXBlYXQoYW1vdW50T2ZQYWRkaW5nKSArIGkgKyAnOiAnICsgcm93VGV4dFxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1Jvd3Muam9pbignXFxuJykgKyAnXFxuJ1xuICB9XG59XG5cbmNsYXNzIER1cGxpY2F0ZVdpdGhDb21tZW50T3V0T3JpZ2luYWwgZXh0ZW5kcyBUcmFuc2Zvcm1TdHJpbmcge1xuICB3aXNlID0gJ2xpbmV3aXNlJ1xuICBzdGF5QnlNYXJrZXIgPSB0cnVlXG4gIHN0YXlBdFNhbWVQb3NpdGlvbiA9IHRydWVcbiAgbXV0YXRlU2VsZWN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICBjb25zdCBbc3RhcnRSb3csIGVuZFJvd10gPSBzZWxlY3Rpb24uZ2V0QnVmZmVyUm93UmFuZ2UoKVxuICAgIHNlbGVjdGlvbi5zZXRCdWZmZXJSYW5nZSh0aGlzLnV0aWxzLmluc2VydFRleHRBdEJ1ZmZlclBvc2l0aW9uKHRoaXMuZWRpdG9yLCBbc3RhcnRSb3csIDBdLCBzZWxlY3Rpb24uZ2V0VGV4dCgpKSlcbiAgICB0aGlzLmVkaXRvci50b2dnbGVMaW5lQ29tbWVudHNGb3JCdWZmZXJSb3dzKHN0YXJ0Um93LCBlbmRSb3cpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFRyYW5zZm9ybVN0cmluZyxcblxuICBOb0Nhc2UsXG4gIERvdENhc2UsXG4gIFN3YXBDYXNlLFxuICBQYXRoQ2FzZSxcbiAgVXBwZXJDYXNlLFxuICBMb3dlckNhc2UsXG4gIENhbWVsQ2FzZSxcbiAgU25ha2VDYXNlLFxuICBUaXRsZUNhc2UsXG4gIFBhcmFtQ2FzZSxcbiAgSGVhZGVyQ2FzZSxcbiAgUGFzY2FsQ2FzZSxcbiAgQ29uc3RhbnRDYXNlLFxuICBTZW50ZW5jZUNhc2UsXG4gIFVwcGVyQ2FzZUZpcnN0LFxuICBMb3dlckNhc2VGaXJzdCxcbiAgRGFzaENhc2UsXG4gIFRvZ2dsZUNhc2UsXG4gIFRvZ2dsZUNhc2VBbmRNb3ZlUmlnaHQsXG5cbiAgUmVwbGFjZSxcbiAgUmVwbGFjZUNoYXJhY3RlcixcbiAgU3BsaXRCeUNoYXJhY3RlcixcbiAgRW5jb2RlVXJpQ29tcG9uZW50LFxuICBEZWNvZGVVcmlDb21wb25lbnQsXG4gIFRyaW1TdHJpbmcsXG4gIENvbXBhY3RTcGFjZXMsXG4gIEFsaWduT2NjdXJyZW5jZSxcbiAgQWxpZ25PY2N1cnJlbmNlQnlQYWRMZWZ0LFxuICBBbGlnbk9jY3VycmVuY2VCeVBhZFJpZ2h0LFxuICBSZW1vdmVMZWFkaW5nV2hpdGVTcGFjZXMsXG4gIENvbnZlcnRUb1NvZnRUYWIsXG4gIENvbnZlcnRUb0hhcmRUYWIsXG4gIFRyYW5zZm9ybVN0cmluZ0J5RXh0ZXJuYWxDb21tYW5kLFxuICBUcmFuc2Zvcm1TdHJpbmdCeVNlbGVjdExpc3QsXG4gIFRyYW5zZm9ybVdvcmRCeVNlbGVjdExpc3QsXG4gIFRyYW5zZm9ybVNtYXJ0V29yZEJ5U2VsZWN0TGlzdCxcbiAgUmVwbGFjZVdpdGhSZWdpc3RlcixcbiAgUmVwbGFjZU9jY3VycmVuY2VXaXRoUmVnaXN0ZXIsXG4gIFN3YXBXaXRoUmVnaXN0ZXIsXG4gIEluZGVudCxcbiAgT3V0ZGVudCxcbiAgQXV0b0luZGVudCxcbiAgVG9nZ2xlTGluZUNvbW1lbnRzLFxuICBSZWZsb3csXG4gIFJlZmxvd1dpdGhTdGF5LFxuICBTdXJyb3VuZEJhc2UsXG4gIFN1cnJvdW5kLFxuICBTdXJyb3VuZFdvcmQsXG4gIFN1cnJvdW5kU21hcnRXb3JkLFxuICBNYXBTdXJyb3VuZCxcbiAgRGVsZXRlU3Vycm91bmQsXG4gIERlbGV0ZVN1cnJvdW5kQW55UGFpcixcbiAgRGVsZXRlU3Vycm91bmRBbnlQYWlyQWxsb3dGb3J3YXJkaW5nLFxuICBDaGFuZ2VTdXJyb3VuZCxcbiAgQ2hhbmdlU3Vycm91bmRBbnlQYWlyLFxuICBDaGFuZ2VTdXJyb3VuZEFueVBhaXJBbGxvd0ZvcndhcmRpbmcsXG4gIEpvaW5UYXJnZXQsXG4gIEpvaW4sXG4gIEpvaW5CYXNlLFxuICBKb2luV2l0aEtlZXBpbmdTcGFjZSxcbiAgSm9pbkJ5SW5wdXQsXG4gIEpvaW5CeUlucHV0V2l0aEtlZXBpbmdTcGFjZSxcbiAgU3BsaXRTdHJpbmcsXG4gIFNwbGl0U3RyaW5nV2l0aEtlZXBpbmdTcGxpdHRlcixcbiAgU3BsaXRBcmd1bWVudHMsXG4gIFNwbGl0QXJndW1lbnRzV2l0aFJlbW92ZVNlcGFyYXRvcixcbiAgU3BsaXRBcmd1bWVudHNPZklubmVyQW55UGFpcixcbiAgQ2hhbmdlT3JkZXIsXG4gIFJldmVyc2UsXG4gIFJldmVyc2VJbm5lckFueVBhaXIsXG4gIFJvdGF0ZSxcbiAgUm90YXRlQmFja3dhcmRzLFxuICBSb3RhdGVBcmd1bWVudHNPZklubmVyUGFpcixcbiAgUm90YXRlQXJndW1lbnRzQmFja3dhcmRzT2ZJbm5lclBhaXIsXG4gIFNvcnQsXG4gIFNvcnRDYXNlSW5zZW5zaXRpdmVseSxcbiAgU29ydEJ5TnVtYmVyLFxuICBOdW1iZXJpbmdMaW5lcyxcbiAgRHVwbGljYXRlV2l0aENvbW1lbnRPdXRPcmlnaW5hbFxufVxuZm9yIChjb25zdCBrbGFzcyBvZiBPYmplY3QudmFsdWVzKG1vZHVsZS5leHBvcnRzKSkge1xuICBpZiAoa2xhc3MuaXNDb21tYW5kKCkpIGtsYXNzLnJlZ2lzdGVyVG9TZWxlY3RMaXN0KClcbn1cbiJdfQ==