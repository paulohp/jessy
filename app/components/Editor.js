var React = require('react');
var Codemirror = require('react-codemirror');

var App = React.createClass({
	getInitialState () {
		return {
			code: 'import'
		};
	},
	updateCode (newCode) {
		this.setState({
			code: newCode
		});
	},
	render () {
		var options = {
			lineNumbers: true,
		};
		return <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />;
	}
});

React.render(<App />, document.getElementById('editor'));
