import React, {Component} from 'react';
import CheckboxOrRadioGroup from '../components/CheckboxOrRadioGroup';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import axios from 'axios'

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerName: '',
            petSelections: [],
            selectedPets: [],
            ageOptions: [],
            ownerAgeRangeSelection: '',
            siblingOptions: [],
            siblingSelection: [],
            currentPetCount: 0,
            description: ''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        this.handleCurrentPetCountChange = this.handleCurrentPetCountChange.bind(this);
        this.handleAgeRangeSelect = this.handleAgeRangeSelect.bind(this);
        this.handlePetSelection = this.handlePetSelection.bind(this);
        this.handleSiblingsSelection = this.handleSiblingsSelection.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }
    componentDidMount() {
        axios.get(`https://raw.githubusercontent.com/ganyanlins/api/master/react/self-react-webpack`)
            .then((res) => {
                this.setState({
                    ownerName: res.data.ownerName,
                    petSelections: res.data.petSelections,
                    selectedPets: res.data.selectedPets,
                    ageOptions: res.data.ageOptions,
                    ownerAgeRangeSelection: res.data.ownerAgeRangeSelection,
                    siblingOptions: res.data.siblingOptions,
                    siblingSelection: res.data.siblingSelection,
                    currentPetCount: res.data.currentPetCount,
                    description: res.data.description
                });
            });
        // fetch('public/data/fake_db.json', {
        //     headers : {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     }
        // })
    //         .then(res => res.json())
    //         .then(data => {
    //             this.setState({
    //                 ownerName: data.ownerName,
    //                 petSelections: data.petSelections,
    //                 selectedPets: data.selectedPets,
    //                 ageOptions: data.ageOptions,
    //                 ownerAgeRangeSelection: data.ownerAgeRangeSelection,
    //                 siblingOptions: data.siblingOptions,
    //                 siblingSelection: data.siblingSelection,
    //                 currentPetCount: data.currentPetCount,
    //                 description: data.description
    //             });
    //         });
    }
    handleFullNameChange(e) {
        this.setState({ ownerName: e.target.value }, () => console.log('name:', this.state.ownerName));
    }
    handleCurrentPetCountChange(e) {
        this.setState({ currentPetCount: e.target.value }, () => console.log('pet count', this.state.currentPetCount));
    }
    handleAgeRangeSelect(e) {
        this.setState({ ownerAgeRangeSelection: e.target.value }, () => console.log('age range', this.state.ownerAgeRangeSelection));
    }
    handlePetSelection(e) {
        const newSelection = e.target.value;
        let newSelectionArray;
        if(this.state.selectedPets.indexOf(newSelection) > -1) {
            newSelectionArray = this.state.selectedPets.filter(s => s !== newSelection)
        } else {
            newSelectionArray = [...this.state.selectedPets, newSelection];
        }
        this.setState({ selectedPets: newSelectionArray }, () => console.log('pet selection', this.state.selectedPets));
    }
    handleSiblingsSelection(e) {
        this.setState({ siblingSelection: [e.target.value] }, () => console.log('siblingz', this.state.siblingSelection));
    }
    handleDescriptionChange(e) {
        // const textArray = e.target.value.split('').filter(x => x !== 'e');
        // console.log('string split into array of letters',textArray);
        // const filteredText = textArray.join('');
        // this.setState({ description: filteredText }, () => console.log('description', this.state.description));
        this.setState({ description: e.target.value }, () => console.log('description', this.state.description));
    }
    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            ownerName: '',
            selectedPets: [],
            ownerAgeRangeSelection: '',
            siblingSelection: [],
            currentPetCount: 0,
            description: ''
        });
    }
    handleFormSubmit(e) {
        e.preventDefault();

        const formPayload = {
            ownerName: this.state.ownerName,
            selectedPets: this.state.selectedPets,
            ownerAgeRangeSelection: this.state.ownerAgeRangeSelection,
            siblingSelection: this.state.siblingSelection,
            currentPetCount: this.state.currentPetCount,
            description: this.state.description
        };

        console.log('Send this in a POST request:', formPayload);
        this.handleClearForm(e);
    }
    render() {
        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <h5>宠物收养表单</h5>
                <SingleInput
                    inputType={'text'}
                    title={'全部名字'}
                    name={'name'}
                    controlFunc={this.handleFullNameChange}
                    content={this.state.ownerName}
                    placeholder={'输入宠物名字'} />
                <Select
                    name={'ageRange'}
                    placeholder={'选择范围'}
                    controlFunc={this.handleAgeRangeSelect}
                    options={this.state.ageOptions}
                    selectedOption={this.state.ownerAgeRangeSelection} />
                <CheckboxOrRadioGroup
                    title={'你想要收养哪种宠物?'}
                    setName={'pets'}
                    type={'checkbox'}
                    controlFunc={this.handlePetSelection}
                    options={this.state.petSelections}
                    selectedOptions={this.state.selectedPets} />
                <CheckboxOrRadioGroup
                    title={'你如果有兄弟姐妹愿意要收养多个宠物吗?'}
                    setName={'siblings'}
                    controlFunc={this.handleSiblingsSelection}
                    type={'radio'}
                    options={this.state.siblingOptions}
                    selectedOptions={this.state.siblingSelection} />
                <SingleInput
                    inputType={'number'}
                    title={'你目前有多少自己的宠物?'}
                    name={'currentPetCount'}
                    controlFunc={this.handleCurrentPetCountChange}
                    content={this.state.currentPetCount}
                    placeholder={'输入当前宠物的数量'} />
                <TextArea
                    title={'如果你目前有自己的宠物,请写出宠物的名字,品种,和它们的个性.'}
                    rows={5}
                    resize={false}
                    content={this.state.description}
                    name={'currentPetInfo'}
                    controlFunc={this.handleDescriptionChange}
                    placeholder={'请详细描述'} />
                <input
                    type="submit"
                    className="btn btn-primary float-right"
                    value="提交"/>
                <button
                    className="btn btn-link float-left"
                    onClick={this.handleClearForm}>清除表单</button>
            </form>
        );
    }
}

export default FormContainer;


