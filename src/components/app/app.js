import { Component } from 'react';

import AppFilter from '../app-filter/app-filter';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John R', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Samina Sh', salary: 1000, increase: true, rise: true, id: 2},
                {name: 'Root', salary: 15000, increase: true, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id);

            // const before = data.slice(0, index);
            // const after = data.slice(index + 1)

            // const newArr = [...before, ...after];


            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId ++
        }

        if(name.length > 3 && salary !== 0) {
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                return {
                    data: newArr
                }
            })
        }
    }

    onToggleProp = (id, prop) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id)

        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase}
        //     const newArr = [...data.slice(0, index), newItem, data.slice(index + 1)]

        //     return {
        //         data: newArr
        //     }
        // })

        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onUpdateFilter = (filter) => {
        this.setState({filter})
    }

    filterEmp = (items, filter) => {
        if (filter === 'all') {
            return items;
        }
        if (filter === 'rised') {
            return items.filter(item => item.rise);
        }
        if (filter === 'highSalary') {
            return items.filter(item => item.salary >= 1000)
        }
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterEmp(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees}
                         increased={increased}/>
                <div className='search-panel'>
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter onUpdateFilter={this.onUpdateFilter}/>
                </div>
                <EmployeesList 
                    data={visibleData} 
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm 
                    onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;