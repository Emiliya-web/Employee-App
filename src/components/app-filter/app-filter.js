import {Component} from 'react';
import './app-filter.css'

class AppFilter extends Component {

    onClick = (e) => {
        const attr = e.target.getAttribute('name')
        this.props.onUpdateFilter(attr)
    }

    render() {
        return (
            <div className="btn-group">
                <button className="btn btn-outline-light"
                        type="button"
                        name='all'
                        onClick = {this.onClick}>
                            Все сотрудники
                </button>
                <button className="btn btn-outline-light"
                        type="button"
                        name='rised'
                        onClick = {this.onClick}>
                            На повышение
                </button>
                <button className="btn btn-outline-light"
                        type="button"
                        name='highSalary'
                        onClick = {this.onClick}>
                            Зп больше 1000$
                </button>
            </div>       
        )
    }
}

export default AppFilter