var Card = React.createClass({
    onDelete: function() {
        alert("It's not like! It's deleting :)");
    },

    render: function() {
        return (
            <div className="card col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="card-info">
                    <h1 className="card-info-title">
                        <span className={'card-info-title-icon ' + this.props.data.iconClass}></span>
                        <span className="card-info-title-text">{this.props.data.title}</span>
                    </h1>
                    <p className="card-info-description">{this.props.data.description}</p>
                </div>

                <div className="card-background">
                    <div className="card-background-image" style={{ backgroundImage: 'url(' + this.props.data.imageUrl + ')' }}></div>
                    <div className="card-background-overlay"></div>
                </div>

                <div className="card-controls">
                    <a href={this.props.data.url} className="btn btn-default" target="blank">Open</a>
                    <button type="button" className="btn btn-default">Print</button>
                    <button type="button" className="btn btn-danger" onClick={this.onDelete}>Delete</button>
                </div>
            </div>
        );
    }
});

var CardsList = React.createClass({
    getInitialState: function() {
        return { data: [] };
    },

    componentDidMount: function() {
        $.getJSON(this.props.url, function(data) {
            this.setState({ data: data });
        }.bind(this));
    },

    render: function() {
        var cards = this.state.data.map(function(data) {
            return <Card data={data}/>
        });

        return (
            <div>
                <h1>{this.props.title}</h1>
                <div className="cardsList row">
                    {cards}
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <CardsList title="Miss World 2015 Top 20" url="src/data.json"/>,
    document.getElementById('cardsList')
);