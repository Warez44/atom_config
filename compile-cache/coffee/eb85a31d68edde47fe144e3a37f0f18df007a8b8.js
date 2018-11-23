(function() {
  var CompositeDisposable, NorminetteLinter, fs, path, sprintf;

  CompositeDisposable = require("atom").CompositeDisposable;

  sprintf = require('sprintf-js').sprintf;

  path = require('path');

  fs = require('fs');

  module.exports = NorminetteLinter = {
    config: {
      executablePath: {
        type: 'string',
        "default": 'norminette',
        description: 'The executable path to the 42 norminette binary.'
      },
      checkedExtensions: {
        type: 'array',
        "default": ['.c', '.h'],
        items: {
          type: 'string'
        },
        description: 'Extensions that the linter will check.'
      },
      rules_CheckInclude: {
        type: 'boolean',
        title: 'CheckInclude',
        "default": false
      },
      rules_CheckTypePrefixName: {
        type: 'boolean',
        title: 'CheckTypePrefixName',
        "default": false
      },
      rules_CheckOneInstructionPerLine: {
        type: 'boolean',
        title: 'CheckOneInstructionPerLine',
        "default": false
      },
      rules_CheckTernaryOperator: {
        type: 'boolean',
        title: 'CheckTernaryOperator',
        "default": false
      },
      rules_CheckPreprocessorIndentation: {
        type: 'boolean',
        title: 'CheckPreprocessorIndentation',
        "default": false
      },
      rules_CheckIncludesBeforeFirstInstruction: {
        type: 'boolean',
        title: 'CheckIncludesBeforeFirstInstruction',
        "default": false
      },
      rules_CheckBlock: {
        type: 'boolean',
        title: 'CheckBlock',
        "default": false
      },
      rules_CheckForbiddenKeyword: {
        type: 'boolean',
        title: 'CheckForbiddenKeyword',
        "default": false
      },
      rules_CheckKeywordSpacing: {
        type: 'boolean',
        title: 'CheckKeywordSpacing',
        "default": false
      },
      rules_CheckAlignement: {
        type: 'boolean',
        title: 'CheckAlignement',
        "default": false
      },
      rules_CheckMultipleSpaces: {
        type: 'boolean',
        title: 'CheckMultipleSpaces',
        "default": false
      },
      rules_CheckNamedParameters: {
        type: 'boolean',
        title: 'CheckNamedParameters',
        "default": false
      },
      rules_CheckReturnParentheses: {
        type: 'boolean',
        title: 'CheckReturnParentheses',
        "default": false
      },
      rules_CheckIndentationMultiline: {
        type: 'boolean',
        title: 'CheckIndentationMultiline',
        "default": false
      },
      rules_CheckCommentsFormat: {
        type: 'boolean',
        title: 'CheckCommentsFormat',
        "default": false
      },
      rules_CheckIndentationInsideFunction: {
        type: 'boolean',
        title: 'CheckIndentationInsideFunction',
        "default": false
      },
      rules_CheckOperatorSpacing: {
        type: 'boolean',
        title: 'CheckOperatorSpacing',
        "default": false
      },
      rules_CheckForbiddenSourceHeader: {
        type: 'boolean',
        title: 'CheckForbiddenSourceHeader',
        "default": false
      },
      rules_CheckMultipleEmptyLines: {
        type: 'boolean',
        title: 'CheckMultipleEmptyLines',
        "default": false
      },
      rules_CheckDefine: {
        type: 'boolean',
        title: 'CheckDefine',
        "default": false
      },
      rules_CheckUnaryOperator: {
        type: 'boolean',
        title: 'CheckUnaryOperator',
        "default": false
      },
      rules_CheckBracketSpacing: {
        type: 'boolean',
        title: 'CheckBracketSpacing',
        "default": false
      },
      rules_CheckFilename: {
        type: 'boolean',
        title: 'CheckFilename',
        "default": false
      },
      rules_CheckParametersNumber: {
        type: 'boolean',
        title: 'CheckParametersNumber',
        "default": false
      },
      rules_CheckControlStructure: {
        type: 'boolean',
        title: 'CheckControlStructure',
        "default": false
      },
      rules_CheckMultipleAssignation: {
        type: 'boolean',
        title: 'CheckMultipleAssignation',
        "default": false
      },
      rules_CheckFunctionSpacing: {
        type: 'boolean',
        title: 'CheckFunctionSpacing',
        "default": false
      },
      rules_CheckFunctionNumber: {
        type: 'boolean',
        title: 'CheckFunctionNumber',
        "default": false
      },
      rules_CheckNestedTernary: {
        type: 'boolean',
        title: 'CheckNestedTernary',
        "default": false
      },
      rules_CheckBeginningOfLine: {
        type: 'boolean',
        title: 'CheckBeginningOfLine',
        "default": false
      },
      rules_CheckDeclarationCount: {
        type: 'boolean',
        title: 'CheckDeclarationCount',
        "default": false
      },
      rules_CheckNumberOfLine: {
        type: 'boolean',
        title: 'CheckNumberOfLine',
        "default": false
      },
      rules_CheckCase: {
        type: 'boolean',
        title: 'CheckCase',
        "default": false
      },
      rules_CheckDoubleInclusion: {
        type: 'boolean',
        title: 'CheckDoubleInclusion',
        "default": false
      },
      rules_CheckTypeDeclarationSpacing: {
        type: 'boolean',
        title: 'CheckTypeDeclarationSpacing',
        "default": false
      },
      rules_CheckCallSpacing: {
        type: 'boolean',
        title: 'CheckCallSpacing',
        "default": false
      },
      rules_CheckDeclarationPlacement: {
        type: 'boolean',
        title: 'CheckDeclarationPlacement',
        "default": false
      },
      rules_CheckSeparationChar: {
        type: 'boolean',
        title: 'CheckSeparationChar',
        "default": false
      },
      rules_CheckTopCommentHeader: {
        type: 'boolean',
        title: 'CheckTopCommentHeader',
        "default": false
      },
      rules_CheckElseIf: {
        type: 'boolean',
        title: 'CheckElseIf',
        "default": false
      },
      rules_CheckNoArgFunction: {
        type: 'boolean',
        title: 'CheckNoArgFunction',
        "default": false
      },
      rules_CheckGlobalTypePrefixName: {
        type: 'boolean',
        title: 'CheckGlobalTypePrefixName',
        "default": false
      },
      rules_CheckEmptyLine: {
        type: 'boolean',
        title: 'CheckEmptyLine',
        "default": false
      },
      rules_CheckVla: {
        type: 'boolean',
        title: 'CheckVla',
        "default": false
      },
      rules_CheckCppComment: {
        type: 'boolean',
        title: 'CheckCppComment',
        "default": false
      },
      rules_CheckSpaceBetweenFunctions: {
        type: 'boolean',
        title: 'CheckSpaceBetweenFunctions',
        "default": false
      },
      rules_CheckArgumentSpacing: {
        type: 'boolean',
        title: 'CheckArgumentSpacing',
        "default": false
      },
      rules_CheckEndOfLine: {
        type: 'boolean',
        title: 'CheckEndOfLine',
        "default": false
      },
      rules_CheckColumnLength: {
        type: 'boolean',
        title: 'CheckColumnLength',
        "default": false
      },
      rules_CheckNumberOfVariables: {
        type: 'boolean',
        title: 'CheckNumberOfVariables',
        "default": false
      },
      rules_CheckComma: {
        type: 'boolean',
        title: 'CheckComma',
        "default": false
      },
      rules_CheckParentSpacing: {
        type: 'boolean',
        title: 'CheckParentSpacing',
        "default": false
      },
      rules_CheckCommentsPlacement: {
        type: 'boolean',
        title: 'CheckCommentsPlacement',
        "default": false
      },
      rules_CheckDeclarationInstanciation: {
        type: 'boolean',
        title: 'CheckDeclarationInstanciation',
        "default": false
      },
      rules_CheckIndentationOutsideFunction: {
        type: 'boolean',
        title: 'CheckIndentationOutsideFunction',
        "default": false
      }
    },
    login: null,
    activate: function(state) {
      var ref;
      this.login = (ref = process.env.USER) != null ? ref : null;
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.config.observe('norminette-linter.executablePath', (function(_this) {
        return function(executablePath) {
          return _this.executablePath = executablePath;
        };
      })(this)));
      return this.subscriptions.add(atom.config.observe('norminette-linter.checkedExtensions', (function(_this) {
        return function(checkedExtensions) {
          return _this.checkedExtensions = checkedExtensions;
        };
      })(this)));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    headerCreator: function(textBuffer) {
      var createdPat, matches;
      createdPat = /Created: \d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} by (.{1,8})/;
      if (matches = textBuffer.match(createdPat)) {
        return matches[1];
      }
    },
    willBeChecked: function(filename) {
      var current, ext, i, len, ref;
      current = path.extname(filename);
      ref = this.checkedExtensions;
      for (i = 0, len = ref.length; i < len; i++) {
        ext = ref[i];
        if (ext === current) {
          return true;
        }
      }
      return false;
    },
    getValidRange: function(line, col, textEditor) {
      var end, start;
      line = parseInt(line) - 1;
      col = parseInt(col) - 1;
      if (line) {
        if (!col) {
          start = [line, 0];
          end = [line, textEditor.getBuffer().lineLengthForRow(line)];
        } else {
          start = [line, col];
          end = [line, col + 1];
        }
      } else {
        start = [0, 0];
        end = start;
      }
      return [start, end];
    },
    getEachError: function(line, filePath, textEditor) {
      var match, message, regex;
      regex = /^(?:Error|Warning)\s*\(?(?:\s*line\s*([0-9]+))?\s*,?(?:\s*col\s*([0-9]+))?\s*\)?:\s*(.+)$/gm;
      match = regex.exec(line);
      if (!match) {
        return null;
      }
      return message = {
        type: 'Norm',
        text: match[3],
        range: this.getValidRange(match[1], match[2], textEditor),
        filePath: filePath
      };
    },
    getErrors: function(output, filePath, textEditor) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var i, len, line, message, messages, ref;
          messages = [];
          ref = output.split(/(\r\n)|\r|\n/);
          for (i = 0, len = ref.length; i < len; i++) {
            line = ref[i];
            message = _this.getEachError(line, filePath, textEditor);
            if (message) {
              messages.push(message);
            }
          }
          return resolve(messages);
        };
      })(this));
    },
    provideLinter: function() {
      var helpers, provider;
      helpers = require('atom-linter');
      return provider = {
        name: 'norminette',
        grammarScopes: ['source.c', 'source.cpp'],
        scope: 'file',
        lintOnFly: false,
        lint: (function(_this) {
          return function(textEditor) {
            var creatorLogin, parameters, rules;
            creatorLogin = _this.headerCreator(textEditor.getBuffer().getText());
            rules = Object.keys(atom.config.settings['norminette-linter']).filter(function(s) {
              return s.startsWith('rules_');
            }).map(function(s) {
              return s.replace('rules_', '');
            });
            if (rules.length > 0) {
              parameters = ['-R', rules.join(), textEditor.getPath()];
            } else {
              parameters = [textEditor.getPath()];
            }
            if (_this.willBeChecked(textEditor.getPath()) === false) {
              return;
            }
            return helpers.exec(_this.executablePath, parameters).then(function(output) {
              return _this.getErrors(output, textEditor.getPath(), textEditor);
            });
          };
        })(this)
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2NsaW5naWVyLy5hdG9tL3BhY2thZ2VzL25vcm1pbmV0dGUtbGludGVyL2xpYi9ub3JtaW5ldHRlLWxpbnRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUjs7RUFDeEIsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBQXFCLENBQUM7O0VBQ2hDLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFDUCxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVI7O0VBRUwsTUFBTSxDQUFDLE9BQVAsR0FBaUIsZ0JBQUEsR0FDZjtJQUFBLE1BQUEsRUFDRTtNQUFBLGNBQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxRQUFOO1FBQ0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxZQURUO1FBRUEsV0FBQSxFQUFhLGtEQUZiO09BREY7TUFJQSxpQkFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLE9BQU47UUFDQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FEVDtRQUVBLEtBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxRQUFOO1NBSEY7UUFJQSxXQUFBLEVBQWEsd0NBSmI7T0FMRjtNQVVBLGtCQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sU0FBTjtRQUNBLEtBQUEsRUFBTyxjQURQO1FBRUEsQ0FBQSxPQUFBLENBQUEsRUFBUyxLQUZUO09BWEY7TUFjQSx5QkFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFNBQU47UUFDQSxLQUFBLEVBQU8scUJBRFA7UUFFQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBRlQ7T0FmRjtNQWtCQSxnQ0FBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFNBQU47UUFDQSxLQUFBLEVBQU8sNEJBRFA7UUFFQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBRlQ7T0FuQkY7TUFzQkEsMEJBQUEsRUFDRTtRQUFBLElB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QVUsQ0FBQyxTQUFYLENBQUEsQ0FBc0IsQ0FBQyxPQUF2QixDQUFBLENBQWY7WUFDZixLQUFBLEdBQVEsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVMsQ0FBQSxtQkFBQSxDQUFqQyxDQUFzRCxDQUFDLE1BQXZELENBQThELFNBQUMsQ0FBRDtxQkFBTyxDQUFDLENBQUMsVUFBRixDQUFhLFFBQWI7WUFBUCxDQUE5RCxDQUE0RixDQUFDLEdBQTdGLENBQWlHLFNBQUMsQ0FBRDtxQkFBTyxDQUFDLENBQUMsT0FBRixDQUFVLFFBQVYsRUFBb0IsRUFBcEI7WUFBUCxDQUFqRztZQUNSLElBQUcsS0FBSyxDQUFDLE1BQU4sR0FBZSxDQUFsQjtjQUNFLFVBQUEsR0FBYSxDQUFDLElBQUQsRUFBTyxLQUFLLENBQUMsSUFBTixDQUFBLENBQVAsRUFBcUIsVUFBVSxDQUFDLE9BQVgsQ0FBQSxDQUFyQixFQURmO2FBQUEsTUFBQTtjQUdFLFVBQUEsR0FBYSxDQUFDLFVBQVUsQ0FBQyxPQUFYLENBQUEsQ0FBRCxFQUhmOztZQUlBLElBQUcsS0FBQyxDQUFBLGFBQUQsQ0FBZSxVQUFVLENBQUMsT0FBWCxDQUFBLENBQWYsQ0FBQSxLQUF3QyxLQUEzQztBQUNFLHFCQURGOzttQkFFQSxPQUFPLENBQUMsSUFBUixDQUFhLEtBQUMsQ0FBQSxjQUFkLEVBQThCLFVBQTlCLENBQXlDLENBQUMsSUFBMUMsQ0FBK0MsU0FBQyxNQUFEO3FCQUM3QyxLQUFDLENBQUEsU0FBRCxDQUFXLE1BQVgsRUFBbUIsVUFBVSxDQUFDLE9BQVgsQ0FBQSxDQUFuQixFQUF5QyxVQUF6QztZQUQ2QyxDQUEvQztVQVRJO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUpOOztJQUhXLENBMVNmOztBQU5GIiwic291cmNlc0NvbnRlbnQiOlsie0NvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSBcImF0b21cIlxuc3ByaW50ZiA9IHJlcXVpcmUoJ3NwcmludGYtanMnKS5zcHJpbnRmXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcbmZzID0gcmVxdWlyZSAnZnMnXG5cbm1vZHVsZS5leHBvcnRzID0gTm9ybWluZXR0ZUxpbnRlciA9XG4gIGNvbmZpZzpcbiAgICBleGVjdXRhYmxlUGF0aDpcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICBkZWZhdWx0OiAnbm9ybWluZXR0ZSdcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGV4ZWN1dGFibGUgcGF0aCB0byB0aGUgNDIgbm9ybWluZXR0ZSBiaW5hcnkuJ1xuICAgIGNoZWNrZWRFeHRlbnNpb25zOlxuICAgICAgdHlwZTogJ2FycmF5J1xuICAgICAgZGVmYXVsdDogWycuYycsICcuaCddXG4gICAgICBpdGVtczpcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgIGRlc2NyaXB0aW9uOiAnRXh0ZW5zaW9ucyB0aGF0IHRoZSBsaW50ZXIgd2lsbCBjaGVjay4nXG4gICAgcnVsZXNfQ2hlY2tJbmNsdWRlOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrSW5jbHVkZSdcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tUeXBlUHJlZml4TmFtZTpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja1R5cGVQcmVmaXhOYW1lJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja09uZUluc3RydWN0aW9uUGVyTGluZTpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja09uZUluc3RydWN0aW9uUGVyTGluZSdcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tUZXJuYXJ5T3BlcmF0b3I6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tUZXJuYXJ5T3BlcmF0b3InXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrUHJlcHJvY2Vzc29ySW5kZW50YXRpb246XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tQcmVwcm9jZXNzb3JJbmRlbnRhdGlvbidcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tJbmNsdWRlc0JlZm9yZUZpcnN0SW5zdHJ1Y3Rpb246XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tJbmNsdWRlc0JlZm9yZUZpcnN0SW5zdHJ1Y3Rpb24nXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrQmxvY2s6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tCbG9jaydcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tGb3JiaWRkZW5LZXl3b3JkOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrRm9yYmlkZGVuS2V5d29yZCdcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tLZXl3b3JkU3BhY2luZzpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja0tleXdvcmRTcGFjaW5nJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja0FsaWduZW1lbnQ6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tBbGlnbmVtZW50J1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja011bHRpcGxlU3BhY2VzOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrTXVsdGlwbGVTcGFjZXMnXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrTmFtZWRQYXJhbWV0ZXJzOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrTmFtZWRQYXJhbWV0ZXJzJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja1JldHVyblBhcmVudGhlc2VzOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrUmV0dXJuUGFyZW50aGVzZXMnXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrSW5kZW50YXRpb25NdWx0aWxpbmU6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tJbmRlbnRhdGlvbk11bHRpbGluZSdcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tDb21tZW50c0Zvcm1hdDpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja0NvbW1lbnRzRm9ybWF0J1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja0luZGVudGF0aW9uSW5zaWRlRnVuY3Rpb246XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tJbmRlbnRhdGlvbkluc2lkZUZ1bmN0aW9uJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja09wZXJhdG9yU3BhY2luZzpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja09wZXJhdG9yU3BhY2luZydcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tGb3JiaWRkZW5Tb3VyY2VIZWFkZXI6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tGb3JiaWRkZW5Tb3VyY2VIZWFkZXInXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrTXVsdGlwbGVFbXB0eUxpbmVzOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrTXVsdGlwbGVFbXB0eUxpbmVzJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja0RlZmluZTpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja0RlZmluZSdcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tVbmFyeU9wZXJhdG9yOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrVW5hcnlPcGVyYXRvcidcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tCcmFja2V0U3BhY2luZzpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja0JyYWNrZXRTcGFjaW5nJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja0ZpbGVuYW1lOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrRmlsZW5hbWUnXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrUGFyYW1ldGVyc051bWJlcjpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja1BhcmFtZXRlcnNOdW1iZXInXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrQ29udHJvbFN0cnVjdHVyZTpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja0NvbnRyb2xTdHJ1Y3R1cmUnXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrTXVsdGlwbGVBc3NpZ25hdGlvbjpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja011bHRpcGxlQXNzaWduYXRpb24nXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrRnVuY3Rpb25TcGFjaW5nOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrRnVuY3Rpb25TcGFjaW5nJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja0Z1bmN0aW9uTnVtYmVyOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrRnVuY3Rpb25OdW1iZXInXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrTmVzdGVkVGVybmFyeTpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja05lc3RlZFRlcm5hcnknXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrQmVnaW5uaW5nT2ZMaW5lOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrQmVnaW5uaW5nT2ZMaW5lJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja0RlY2xhcmF0aW9uQ291bnQ6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tEZWNsYXJhdGlvbkNvdW50J1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja051bWJlck9mTGluZTpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja051bWJlck9mTGluZSdcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tDYXNlOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrQ2FzZSdcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tEb3VibGVJbmNsdXNpb246XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tEb3VibGVJbmNsdXNpb24nXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrVHlwZURlY2xhcmF0aW9uU3BhY2luZzpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja1R5cGVEZWNsYXJhdGlvblNwYWNpbmcnXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrQ2FsbFNwYWNpbmc6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tDYWxsU3BhY2luZydcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tEZWNsYXJhdGlvblBsYWNlbWVudDpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja0RlY2xhcmF0aW9uUGxhY2VtZW50J1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja1NlcGFyYXRpb25DaGFyOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrU2VwYXJhdGlvbkNoYXInXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrVG9wQ29tbWVudEhlYWRlcjpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja1RvcENvbW1lbnRIZWFkZXInXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrRWxzZUlmOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrRWxzZUlmJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja05vQXJnRnVuY3Rpb246XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tOb0FyZ0Z1bmN0aW9uJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja0dsb2JhbFR5cGVQcmVmaXhOYW1lOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrR2xvYmFsVHlwZVByZWZpeE5hbWUnXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrRW1wdHlMaW5lOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrRW1wdHlMaW5lJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja1ZsYTpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja1ZsYSdcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tDcHBDb21tZW50OlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrQ3BwQ29tbWVudCdcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tTcGFjZUJldHdlZW5GdW5jdGlvbnM6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tTcGFjZUJldHdlZW5GdW5jdGlvbnMnXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrQXJndW1lbnRTcGFjaW5nOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrQXJndW1lbnRTcGFjaW5nJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja0VuZE9mTGluZTpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja0VuZE9mTGluZSdcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tDb2x1bW5MZW5ndGg6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tDb2x1bW5MZW5ndGgnXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrTnVtYmVyT2ZWYXJpYWJsZXM6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tOdW1iZXJPZlZhcmlhYmxlcydcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcnVsZXNfQ2hlY2tDb21tYTpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgdGl0bGU6ICdDaGVja0NvbW1hJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja1BhcmVudFNwYWNpbmc6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIHRpdGxlOiAnQ2hlY2tQYXJlbnRTcGFjaW5nJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja0NvbW1lbnRzUGxhY2VtZW50OlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrQ29tbWVudHNQbGFjZW1lbnQnXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHJ1bGVzX0NoZWNrRGVjbGFyYXRpb25JbnN0YW5jaWF0aW9uOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrRGVjbGFyYXRpb25JbnN0YW5jaWF0aW9uJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBydWxlc19DaGVja0luZGVudGF0aW9uT3V0c2lkZUZ1bmN0aW9uOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICB0aXRsZTogJ0NoZWNrSW5kZW50YXRpb25PdXRzaWRlRnVuY3Rpb24nXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuXG4gIGxvZ2luOiBudWxsXG5cbiAgYWN0aXZhdGU6IChzdGF0ZSkgLT5cbiAgICBAbG9naW4gPSBwcm9jZXNzLmVudi5VU0VSID8gbnVsbFxuICAgIEBzdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS5jb25maWcub2JzZXJ2ZSAnbm9ybWluZXR0ZS1saW50ZXIuZXhlY3V0YWJsZVBhdGgnLFxuICAgICAgKGV4ZWN1dGFibGVQYXRoKSA9PiBAZXhlY3V0YWJsZVBhdGggPSBleGVjdXRhYmxlUGF0aFxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbmZpZy5vYnNlcnZlICdub3JtaW5ldHRlLWxpbnRlci5jaGVja2VkRXh0ZW5zaW9ucydcbiAgICAsIChjaGVja2VkRXh0ZW5zaW9ucykgPT4gQGNoZWNrZWRFeHRlbnNpb25zID0gY2hlY2tlZEV4dGVuc2lvbnNcblxuICBkZWFjdGl2YXRlOiAtPlxuICAgIEBzdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuXG4gIGhlYWRlckNyZWF0b3I6ICh0ZXh0QnVmZmVyKSAtPlxuICAgIGNyZWF0ZWRQYXQgPSAvQ3JlYXRlZDogXFxkezR9XFwvXFxkezJ9XFwvXFxkezJ9IFxcZHsyfTpcXGR7Mn06XFxkezJ9IGJ5ICguezEsOH0pL1xuICAgIGlmIG1hdGNoZXMgPSB0ZXh0QnVmZmVyLm1hdGNoIGNyZWF0ZWRQYXRcbiAgICAgIHJldHVybiBtYXRjaGVzWzFdXG5cbiAgd2lsbEJlQ2hlY2tlZDogKGZpbGVuYW1lKSAtPlxuICAgIGN1cnJlbnQgPSBwYXRoLmV4dG5hbWUoZmlsZW5hbWUpXG4gICAgZm9yIGV4dCBpbiBAY2hlY2tlZEV4dGVuc2lvbnNcbiAgICAgIHJldHVybiB0cnVlIGlmIGV4dCA9PSBjdXJyZW50XG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgZ2V0VmFsaWRSYW5nZTogKGxpbmUsIGNvbCwgdGV4dEVkaXRvcikgLT5cbiAgICBsaW5lID0gcGFyc2VJbnQobGluZSkgLSAxXG4gICAgY29sID0gcGFyc2VJbnQoY29sKSAtIDFcbiAgICBpZiBsaW5lXG4gICAgICBpZiAhY29sICMgaWYgbm8gY29sdW1uIHNwZWNpZmllZFxuICAgICAgICBzdGFydCA9IFtsaW5lLCAwXVxuICAgICAgICBlbmQgPSBbbGluZSwgdGV4dEVkaXRvci5nZXRCdWZmZXIoKS5saW5lTGVuZ3RoRm9yUm93KGxpbmUpXVxuICAgICAgZWxzZVxuICAgICAgICBzdGFydCA9IFtsaW5lLCBjb2xdXG4gICAgICAgIGVuZCA9IFtsaW5lLCBjb2wgKyAxXVxuICAgIGVsc2VcbiAgICAgIHN0YXJ0ID0gWzAsIDBdXG4gICAgICBlbmQgPSBzdGFydFxuICAgIFtzdGFydCwgZW5kXVxuXG4gIGdldEVhY2hFcnJvcjogKGxpbmUsIGZpbGVQYXRoLCB0ZXh0RWRpdG9yKSAtPlxuICAgIHJlZ2V4ID0gLy8vIF5cbiAgICAoPzpFcnJvcnxXYXJuaW5nKVxccypcXCg/XG4gICAgKD86XFxzKmxpbmVcXHMqKFswLTldKykpPyAgICMgWzFdIGdldCBsaW5lXG4gICAgXFxzKiw/XG4gICAgKD86XFxzKmNvbFxccyooWzAtOV0rKSk/ICAgICMgWzJdIGdldCBjb2x1bW5cbiAgICBcXHMqXFwpP1xuICAgIDpcXHMqKC4rKSAgICAgICAgICAgICAgICAgICMgWzNdIGdldCBtZXNzYWdlXG4gICAgJCAvLy9nbVxuICAgIG1hdGNoID0gcmVnZXguZXhlYyhsaW5lKVxuICAgIGlmICFtYXRjaFxuICAgICAgcmV0dXJuIG51bGxcbiAgICBtZXNzYWdlID0ge1xuICAgICAgdHlwZTogJ05vcm0nLFxuICAgICAgdGV4dDogbWF0Y2hbM10sXG4gICAgICByYW5nZTogQGdldFZhbGlkUmFuZ2UobWF0Y2hbMV0sIG1hdGNoWzJdLCB0ZXh0RWRpdG9yKSxcbiAgICAgIGZpbGVQYXRoOiBmaWxlUGF0aFxuICAgIH1cblxuICBnZXRFcnJvcnM6IChvdXRwdXQsIGZpbGVQYXRoLCB0ZXh0RWRpdG9yKSAtPlxuICAgIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBtZXNzYWdlcyA9IFtdXG4gICAgICBmb3IgbGluZSBpbiBvdXRwdXQuc3BsaXQgLyhcXHJcXG4pfFxccnxcXG4vXG4gICAgICAgIG1lc3NhZ2UgPSBAZ2V0RWFjaEVycm9yKGxpbmUsIGZpbGVQYXRoLCB0ZXh0RWRpdG9yKVxuICAgICAgICBtZXNzYWdlcy5wdXNoKG1lc3NhZ2UpIGlmIG1lc3NhZ2VcbiAgICAgIHJlc29sdmUobWVzc2FnZXMpXG5cbiAgcHJvdmlkZUxpbnRlcjogLT5cbiAgICBoZWxwZXJzID0gcmVxdWlyZSAnYXRvbS1saW50ZXInXG4gICAgcHJvdmlkZXIgPVxuICAgICAgbmFtZTogJ25vcm1pbmV0dGUnXG4gICAgICBncmFtbWFyU2NvcGVzOiBbJ3NvdXJjZS5jJywgJ3NvdXJjZS5jcHAnXVxuICAgICAgc2NvcGU6ICdmaWxlJ1xuICAgICAgbGludE9uRmx5OiBmYWxzZVxuICAgICAgbGludDogKHRleHRFZGl0b3IpID0+XG4gICAgICAgIGNyZWF0b3JMb2dpbiA9IEBoZWFkZXJDcmVhdG9yKHRleHRFZGl0b3IuZ2V0QnVmZmVyKCkuZ2V0VGV4dCgpKVxuICAgICAgICBydWxlcyA9IE9iamVjdC5rZXlzKGF0b20uY29uZmlnLnNldHRpbmdzWydub3JtaW5ldHRlLWxpbnRlciddKS5maWx0ZXIoKHMpIC0+IHMuc3RhcnRzV2l0aCgncnVsZXNfJykpLm1hcCgocykgLT4gcy5yZXBsYWNlKCdydWxlc18nLCAnJykpXG4gICAgICAgIGlmIHJ1bGVzLmxlbmd0aCA+IDBcbiAgICAgICAgICBwYXJhbWV0ZXJzID0gWyctUicsIHJ1bGVzLmpvaW4oKSwgdGV4dEVkaXRvci5nZXRQYXRoKCldXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBwYXJhbWV0ZXJzID0gW3RleHRFZGl0b3IuZ2V0UGF0aCgpXVxuICAgICAgICBpZiBAd2lsbEJlQ2hlY2tlZCh0ZXh0RWRpdG9yLmdldFBhdGgoKSkgPT0gZmFsc2VcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgaGVscGVycy5leGVjKEBleGVjdXRhYmxlUGF0aCwgcGFyYW1ldGVycykudGhlbiAob3V0cHV0KSA9PlxuICAgICAgICAgIEBnZXRFcnJvcnMob3V0cHV0LCB0ZXh0RWRpdG9yLmdldFBhdGgoKSwgdGV4dEVkaXRvcilcbiJdfQ==
