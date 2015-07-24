'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the superior ' + chalk.red('Rusic Bare Theme') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What\'s your project name?'
    }, {
      type: 'input',
      name: 'description',
      message: 'Description for your project'
    }, {
      type: 'input',
      name: 'api_key',
      message: 'What is your API key?'
    }, {
      type: 'input',
      name: 'theme_id',
      message: 'What is your theme\'s ID?'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('.rusic.yml'),
      this.destinationPath('.rusic.yml'),
      {
        api_key: this.props.api_key,
        theme_id: this.props.theme_id
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        name: this.props.name,
        description: this.props.description
      }
    );

    this.fs.copyTpl(
      this.templatePath('layouts/subdomain.html.liquid'),
      this.destinationPath('layouts/subdomain.html.liquid'),
      {
        name: this.props.name,
        description: this.props.description
      }
    );

    ['assets', 'snippets', 'ideas'].forEach(function(folder) {
      this.fs.copy(
        this.templatePath(folder),
        this.destinationPath(folder)
      );
    }.bind(this));
  }
});
