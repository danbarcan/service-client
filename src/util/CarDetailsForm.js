import {
  getAll, getAllDetailsByTypeYearId, getAllModelsByManufacturerId, getAllTypeYearsByModelId

} from "./APIUtils";
import { Form, Select } from "antd";
import React, { Component } from "react";

const FormItem = Form.Item;

const children = [];
const childrenModel = [];
const childrenType = [];
const childrenDetails = [];
const { Option } = Select;


getAll().then(response => {
  for (let i = 0; i < response.length; i++) {
    children.push(<Option key={response[i].id}>{response[i].name.toString()}</Option>);
  }
})

class CarDetailsForm extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      make: {
        value: ""
      },
      model: {
        value: ""
      },
      year: {
        value: ""
      },
      motor: {
        value: ""
      }
    }
  }

  changeCar = value => {
    this.setState({
      make: {
        value: value
      }, model: {
        value: ""
      },
      year: {
        value: ""
      },
      motor: {
        value: ""
      }

    }, this.getModelsByMake)
      ;
  }

  getModelsByMake() {

    getAllModelsByManufacturerId(this.state.make.value).then(response => {
      childrenModel.length = 0;
      for (let i = 0; i < response.length; i++) {
        childrenModel.push(<Option key={response[i].id}>{response[i].name.toString()}</Option>);
      }
    })
  }

  changeModel = value => {
    this.setState({
      model: {
        value: value
      },
      year: {
        value: ""
      },
      motor: {
        value: ""
      }
    }, this.getTypeByModel)
  };

  getTypeByModel() {
    getAllTypeYearsByModelId(this.state.model.value).then(response => {
      childrenType.length = 0;
      for (let i = 0; i < response.length; i++) {
        childrenType.push(<Option key={response[i].id}>{response[i].name.toString()}</Option>);
      }
    })
  }

  changeType = value => {
    this.setState({
      year: { value: value },
      motor: { value: "" }
    }, this.getDetailsByType)
  }

  getDetailsByType() {
    getAllDetailsByTypeYearId(this.state.year.value).then(response => {
      childrenDetails.length = 0;
      for (let i = 0; i < response.length; i++) {
        childrenDetails.push(<Option key={response[i].id}>{response[i].type.toString()}</Option>);
      }
    })
  }

  changeDetails = value => {
    this.props.parentCallback(value)

    this.setState({
      motor: { value: value }
    })
  }

  render() {
    return (
      <div className="">
        < FormItem label="Marca *" >
          <Select
            showSearch
            style={{ width: '100%' }}
            size="large"
            placeholder="Marca masinii"
            optionFilterProp="children"
            onChange={this.changeCar}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {children}
          </Select>
        </FormItem >

        <FormItem label="Model *">
          <Select
            style={{ width: '100%' }}
            size="large"
            placeholder="Modelul masinii"
            optionFilterProp="children"
            onChange={this.changeModel}
          >
            {childrenModel}
          </Select>
        </FormItem>

        <FormItem label="An *" >
          <Select
            style={{ width: '100%' }}
            size="large"
            placeholder="Anul masinii"
            optionFilterProp="children"
            onChange={this.changeType}
          >
            {childrenType}
          </Select>
        </FormItem>

        <FormItem label="Motorizare *" hasFeedback>
          <Select onChange={this.changeDetails}
            size="large"
            placeholder="Motorizarea"
            optionFilterProp="children">
            {childrenDetails}
          </Select>
        </FormItem>
      </div>
    );
  }
}

export default CarDetailsForm;