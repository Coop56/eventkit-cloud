import React, {PropTypes, Component} from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ol from 'openlayers';
import JobItem from './JobItem';


export class JobList extends Component {
    constructor(props) {
        super(props);
        this.updateColumns = this.updateColumns.bind(this);
        this.state = {
            cols: 2
        }
    }

    componentWillMount() {
        this.updateColumns();
        window.addEventListener('resize', this.updateColumns);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateColumns);
    }

    updateColumns() {
        if(window.innerWidth <= 800) {
            this.setState({cols: 1});
        }
        else if(window.innerWidth > 1300) {
            this.setState({cols: 3});
        }
        else {
            this.setState({cols: 2});
        }
    }


    render() {
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                marginTop: '10px',
                marginLeft: '10px',
                marginRight: '10px',
            },
            gridList: {
                border: '1px',
                width: '80%',
                height: 'auto',
            },
        };

        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={'auto'}
                    style={styles.gridList}
                    cols={this.state.cols}
                >
                    {this.props.jobs.map((job) => (
                        <JobItem job={job} key={job.uid}/>
                    ))}
                </GridList>
            </div>
        )
    }
}

JobList.propTypes = {
    jobs: PropTypes.array.isRequired
};

export default JobList;