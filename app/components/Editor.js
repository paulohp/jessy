var React = require('react');
var Codemirror = require('react-codemirror');
var socket = io.connect();

var Result = React.createClass({
  render () {
    return (
			<div className="col-md-6">
				{this.props.result}
        <div className="alert alert-danger">{this.props.error}</div>
			</div>
			);
  }
});


var App = React.createClass({
	getInitialState () {
		return {
			code: '//Start codiging here..'
		};
	},
	updateCode (newCode) {
    var self = this;
    socket.emit('newCode', newCode, function (err, code) {
			if (err){
				self.setState({error: err})
			}
      console.log("CODER", code);
      self.setState({result: code})
		});

		this.setState({
			code: newCode
		});
	},
	render () {
		var options = {
			lineNumbers: true
		};
		return (
			<div className="row">
        <div className="col-md-6">
				<Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
        </div>
				<Result error={this.state.error} result={this.state.result} update={this.updateCode} />
			</div>
			);
	}
});

React.render(<App />, document.getElementById('editor'));
