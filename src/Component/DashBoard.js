import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Modal,
    Backdrop,
    Fade
} from "@material-ui/core"
import Axios from 'axios';


const styles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});

class DashBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            array: [],
            Title: "",
            Id: 0,
            open: false,
            CurrentData: {}
        }
        // this.fetchData = this.fetchData.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }


    handleChange = (event, text) => {
        this.setState({
            ...this.state,
            Title: text,
            Id: event.target.value,
        }, () => this.fetchData())

    };

    fetchData = () => {
        console.log(this.state)
        Axios.get("https://jsonplaceholder.typicode.com/posts/" + this.state.Id)
            .then(res => {
                if (res.status === 200) {
                    debugger;
                    this.setState({
                        ...this.state,
                        open: true,
                        CurrentData: res.data
                    })
                }
            })
    }
    componentDidMount() {
        Axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
            if (res.status === 200) {
                let data = res.data;
                this.setState({
                    ...this.state,
                    array: data
                })
            }
        })
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            open: false
        })
    }
    render() {
        const { classes } = this.props;

        return (
            <>
                <FormControl
                    style={{ minWidth: 120 }}
                    className="form-control">
                    <InputLabel id="demo-controlled-open-select-label">Title</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={this.state.Id}
                        onChange={(e) => this.handleChange(e)}
                    >
                        <MenuItem value="0">
                            <em>None</em>
                        </MenuItem>
                        {this.state.array.map(item =>
                            <MenuItem key={item.id} value={item.id}>{item.title.slice(1, 10)}</MenuItem>
                        )}

                    </Select>
                </FormControl>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <div
                            className={classes.paper}
                        >
                            <h2 id="transition-modal-title">{this.state.CurrentData.title}</h2>
                            <p id="transition-modal-description">{this.state.CurrentData.body}</p>
                        </div>
                    </Fade>
                </Modal>
            </>
        )
    }
}
export default withStyles(styles)(DashBoard)