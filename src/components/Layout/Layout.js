import React,{ Component } from "react";
import SideDrawer from "../UI/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../UI/Navigation/Toolbar/Toolbar";
import classes from './Layout.module.css';

class Layout extends Component{
    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => this.setState({showSideDrawer: false})

    sideDrawerOpenedHandler = () => this.setState({showSideDrawer : true})

    render(){
        return (
            <React.Fragment>
                <Toolbar menuClicked={this.sideDrawerOpenedHandler}/>
                <SideDrawer 
                open={this.state.showSideDrawer }
                closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export default Layout



