import React, { Component } from 'react';
import { rowData } from './appData';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        Alldata: rowData,
        id: '',
        title: '',
        info: '',
        price: '',
        company: ''
    };

    // Load data from localStorage when component mounts
    componentDidMount() {
        const savedData = JSON.parse(localStorage.getItem('Alldata'));
        if (savedData) {
            this.setState({ Alldata: savedData });
        }
    }

    // Save data to localStorage whenever Alldata changes
    componentDidUpdate(_, prevState) {
        if (prevState.Alldata !== this.state.Alldata) {
            localStorage.setItem('Alldata', JSON.stringify(this.state.Alldata));
        }
    }

    getRecord = (id) => {
        return this.state.Alldata.find(item => item.id === id);
    }

    onEdit = (id) => {
        const selectedRecord = this.getRecord(id);
        if (selectedRecord) {
            this.setState({
                id: selectedRecord.id,
                title: selectedRecord.title,
                info: selectedRecord.info,
                price: selectedRecord.price,
                company: selectedRecord.company
            });
        }
    }

    updateValue = (e, field) => {
        this.setState({ [field]: e.target.value });
    }

    onSave = () => {
        const { id, title, info, price, company, Alldata } = this.state;

        if (id) {
            // Update existing record
            const updatedData = Alldata.map(item =>
                item.id === id ? { ...item, title, info, price, company } : item
            );
            this.setState({
                Alldata: updatedData,
                id: "", title: "", info: "", price: "", company: ""
            });
        } else {
            // Add new record
            const newRecord = {
                id: Alldata.length > 0 ? Math.max(...Alldata.map(item => item.id)) + 1 : 1,
                title,
                info,
                price,
                company
            };
            this.setState({
                Alldata: [...Alldata, newRecord],
                id: "", title: "", info: "", price: "", company: ""
            });
        }
    }

    onDelete = (id) => {
        const updatedData = this.state.Alldata.filter(item => item.id !== id);
        this.setState({ Alldata: updatedData });
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                onEdit: this.onEdit,
                onSave: this.onSave,
                updateValue: this.updateValue,
                onDelete: this.onDelete
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
