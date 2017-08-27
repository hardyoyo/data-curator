var file_formats = require('../renderer/file-actions.js').formats
const {shell} = require('electron')

// build 'Open...' and 'Save As...' submenus
var open_submenu = []
var save_submenu = []
for (var format in file_formats) {
  var open_option = {
    label: file_formats[format].label,
    click: (function(format) {
      return function() {
        fileActions.openFile(format)
      }
    }(file_formats[format]))
  }
  if (format === 'csv') {
    open_option.accelerator = 'CmdOrCtrl+O'
  }
  open_submenu.push(open_option)

  var save_option = {
    label: file_formats[format].label,
    click: (function(format) {
      return function() {
        fileActions.saveFileAs(format)
      }
    }(file_formats[format]))
  }
  if (format === 'csv') {
    save_option.accelerator = 'Shift+CmdOrCtrl+S'
  }
  save_submenu.push(save_option)
}
open_submenu.push({
  label: 'Custom',
  click: function() {
    fileActions.openCustom()
  }
})
save_submenu.push({
  label: 'Custom',
  click: function() {
    fileActions.saveAsCustom()
  }
})

exports.menu = [
  {label: 'Data Curator',
    submenu: [
      {label: 'About Data Curator',
        click: function() {
          utils.showAboutPanel()
        }
      },
      {label: 'Check for Update',
        enabled: false
      },
      {type: 'separator'},
      {label: 'Preferences',
        accelerator: 'CmdOrCtrl+,',
        enabled: false
      },
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  },
  {label: 'File',
    submenu: [
      {label: 'New',
        accelerator: 'CmdOrCtrl+N',
        click: function() {
          utils.createWindowTab()
        }
      },
//      {label: 'New from Schema...',
//        click: function() {
//          schema.generateTemplate()
//        }
//      },
      {type: 'separator'},
      {label: 'Open separated value file',
        submenu: open_submenu
      },
      {label: 'Open Excel file...',
        click: function() {
          excel.importExcel()
        }
      },
      {label: 'Open Google Sheet...',
        enabled: false
      },
      {label: 'Open Data Package...',
        enabled: false
      },
//      {label: 'Open Recent',
//        enabled: false,
//        submenu: []
//      },
      {type: 'separator'},
      {label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function() {
          fileActions.saveFile()
        },
        id: 'save'
      },
      {label: 'Save As',
        submenu: save_submenu
      },
      {label: 'Save All',
        accelerator: 'Alt+CmdOrCtrl+S',
        enabled: false
      },
      {type: 'separator'},
      {label: 'Close Tab',
        accelerator: 'CmdOrCtrl+W'
      },
      {label: 'Close All',
        enabled: false
      },
      {type: 'separator'},
      {label: 'Export Data Package...',
        accelerator: 'CmdOrCtrl+D',
        click: function() {
          datapackage.exportdata()
        }
      }
//      {label: 'Github',
//        submenu: [
//          {label: 'Export to Github',
//            accelerator: 'CmdOrCtrl+G',
//            click: function() {
//              github.exportToGithub()
//            }
//          },
//          {label: 'Add file to Github',
//            accelerator: 'CmdOrCtrl+Shift+G',
//            click: function() {
//              github.addFileToGithub()
//            }
//          }
//        ]
//      }
    ]
  },
  {label: 'Edit',
    submenu: [
      {label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editUndo')
        }
      },
      {label: 'Redo',
        accelerator: 'CmdOrCtrl+Y',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editRedo')
        }
      },
      {type: 'separator'},
      {label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editCut')
        }
      },
      {label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editCopy')
        }
      },
      {label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editPaste')
        }
      },
      {label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editSelectAll')
        }
      },
      {type: 'separator'},
//      {label: 'Freeze Header Row',
//        click: function() {
//          BrowserWindow.getFocusedWindow().webContents.send('freeze')
//        }
//      },
//      {label: 'Unfreeze Header Row',
//        click: function() {
//          BrowserWindow.getFocusedWindow().webContents.send('unfreeze')
//        }
//      },
//      {type: 'separator'},
      {label: 'Insert row above',
        accelerator: 'CmdOrCtrl+I',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('insertRowAbove')
        }
      },
      {label: 'Insert row below',
        accelerator: 'CmdOrCtrl+K',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('insertRowBelow')
        }
      },
      {type: 'separator'},
      {label: 'Insert column left',
        accelerator: 'CmdOrCtrl+J',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('insertColumnLeft')
        }
      },
      {label: 'Insert column right',
        accelerator: 'CmdOrCtrl+L',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('insertColumnRight')
        }
      },
      {type: 'separator'},
      {label: 'Remove row(s)',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('removeRows')
        }
      },
      {label: 'Remove column(s)',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('removeColumns')
        }
      }
    ]
  },
  {label: 'Find',
    submenu: [
      {label: 'Find',
        accelerator: 'CmdOrCtrl+F',
        enabled: false
      },
      {label: 'Find Next',
        accelerator: 'CmdOrCtrl+G',
        enabled: false
      },
      {label: 'Find Previous',
        accelerator: 'Shift+CmdOrCtrl+G',
        enabled: false
      },
      {type: 'separator'},
      {label: 'Replace',
        accelerator: 'Alt+CmdOrCtrl+F',
        enabled: false
      },
      {label: 'Replace Next',
        accelerator: 'Alt+CmdOrCtrl+E',
        enabled: false
      },
      {label: 'Replace All',
        enabled: false
      },
      {type: 'separator'},
      {label: 'Sort',
        accelerator: 'Shift+CmdOrCtrl+R',
        enabled: false
      },
      {label: 'Filter',
        enabled: false
      }
    ]
  },
  {label: 'Tools',
    submenu: [
      {label: 'Toggle DevTools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: function() {
          BrowserWindow.getFocusedWindow().toggleDevTools()
        }
      },
      {type: 'separator'},
      {label: 'Validate',
        accelerator: 'Shift+CmdOrCtrl+V',
        click: function() {
          validate.validateFile()
        }
      },
//      {label: 'Validate with schema',
//        click: function() {
//          validate.validateWithSchema()
//        }
//      },
      {label: 'Fix Ragged Rows',
        click: function() {
          tools.fixRaggedRowsFile()
        }
      },
      {type: 'separator'},
      {label: 'Import Column Properties',
        enabled: false
      },
      {label: 'Guess Column Properties'
      },
//      {label: 'Generate Header',
//        click: function() {
//          tools.generateSchemaFromHeader()
//        }
//      },
      {label: 'Guess Valid Values',
        enabled: false
      },
      {type: 'separator'},
      {label: 'Column Properties'
      },
      {label: 'Table Properties'
      },
      {label: 'Provenance Information'
      },
      {label: 'Data Package Properties'
      },
      {type: 'separator'},
      {label: 'Graph Properties',
        enabled: false
//       , icon: '../static/img/locked.svg'
      },
      {label: 'Assess Data Quality',
        enabled: false
//       , icon: '../static/img/locked.svg'
      },
      {type: 'separator'},
      {label: 'Publish to',
        enabled: false,
        submenu: [
          {label: 'CKAN',
            enabled: false
//          , icon: '../static/img/locked.svg'
          },
          {label: 'DataHub',
            enabled: false
//          , icon: '../static/img/locked.svg'
          },
          {label: 'OctoPub',
            enabled: false
//          , icon: '../static/img/locked.svg'
          }
        ]
      }
    ]
  },
  {label: 'Window',
    submenu: [
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {label: 'Next Tab',
        enabled: false,
        accelerator: 'CmdOrCtrl+Right'
      },
      {label: 'Previous Tab',
        enabled: false,
        accelerator: 'CmdOrCtrl+Left'
      },
      {type: 'separator'},
      {label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }
    ]
  },
  {role: 'help',
    submenu: [
      {label: 'Data Curator Help',
        click: function() {
          shell.openExternal('https://odiqueensland.github.io/data-curator-help/')
        }
      },
      {label: 'Keyboard Shortcuts',
        click: function() {
          help.showKeyboardHelp()
        }
      },
      {type: 'separator'},
      {label: 'Support Forum',
        click: function() {
          shell.openExternal('https://ask.theodi.org.au/c/projects/data-curator')
        }
      },
      {label: 'Report Issues',
        click: function() {
          shell.openExternal('https://github.com/ODIQueensland/data-curator/blob/develop/.github/CONTRIBUTING.md')
        }
      }
    ]
  }
]
