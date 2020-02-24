import React, { Component } from "react";
import { updateUser, updateServiceDetails } from "../../util/APIUtils";
import { Redirect } from 'react-router';
import { Form, Input, Button, Icon, notification, Upload, message } from "antd";
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH
} from "../../constants";
import "./Profile.css";
const FormItem = Form.Item;


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Pot fi uploadate numai poze in format JPG sau PNG');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Imaginea trebuie sa fie mai mica de 2MB !');
  }
  return isJpgOrPng && isLt2M;
}

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: ""
      },
      pw: {
        value: ""
      },
      newpw: {
        value: ""
      },
      phone: {
        value: ""
      },
      email: {
        value: ""
      },
      society: {
        value: ""
      },
      address: {
        value: ""
      },
      companyDescription: {
        value: " "
      },
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }

  handleChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;
    console.log(this.state);

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    });
  }

  handleNewPassword(event) {
    // if (event.target.value === this.state.pw) {
    //   notification.warning({
    //     message: "Smart Service",
    //     description:
    //       " Parola trebuie sa fie diferita. Va rugam reincercati",
    //     duration: 10
    //   });
    // } else {
    //   const target = event.target;
    //   const inputName = target.name;
    //   const inputValue = target.value;
    //   this.validate(inputValue);

    //   this.setState({
    //     [inputName]: inputValue
    //   });
    // }
  }

  handleImageChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {

      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.society.value || this.state.address.value || this.state.companyDescription.value || this.state.imageUrl){
      console.log(this.state);
      const serviceDetails = {
        serviceName: this.state.society.value,
        serviceAddress: this.state.address.value,
        companyDescription: this.state.companyDescription.value,
        image: this.state.imageUrl
      };

      updateServiceDetails(serviceDetails)
      .then(response => {
        notification.success({
          message: "Smart Service",
          description: "Multumim ! Noile detalii au fost salvate!"
        });
      })
      .catch(error => {
        notification.error({
          message: "Smart Service",
          description:
            "Oups! Ceva nu a functionat corect!"
        });
      });
    } else{
      if (this.state.newpw === this.state.pw) {
        this.setState({
          incorrectPassword: true
        })
      } else {
        const userRequest = {
          id: this.props.currentUser.id,
          name: this.state.name.value,
          username: this.props.currentUser.username,
          oldPassword: this.state.pw.value,
          password: this.state.newpw.value,
          phone: this.state.phone.value,
          email: this.state.email.value,
          redirectHome: false
        };
        updateUser(userRequest)
          .then(response => {
            notification.success({
              message: "Smart Service",
              description: "Multumim ! Noile detalii au fost salvate!"
            });
            this.setState({
              redirectHome: true
            })
          })
          .catch(error => {
            notification.error({
              message: "Smart Service",
              description:
                "Oups! Va rugam sa introduceti parola actuala corecta!"
            });
          });
      }
    }
  }

  isFormInvalid() {
    return !(
      this.state.name.validateStatus === "success" &&
      this.state.pw.validateStatus === "success" &&
      this.state.newpw.validateStatus === "success" &&
      this.state.phone.validateStatus === "success" &&
      this.state.email.validateStatus === "success"
    );
  }

  // isFormInvalidStaff() {
  //   return !(
  //     this.state.name.validateStatus === "success" &&
  //     this.state.username.validateStatus === "success" &&
  //     this.state.email.validateStatus === "success" &&
  //     this.state.phone.validateStatus === "success" &&
  //     this.state.password.validateStatus === "success" &&
  //     this.state.service_name.validateStatus === "success" &&
  //     this.state.service_address.validateStatus === "success" &&
  //     this.state.cui.validateStatus === "success"
  //   );
  // }

  render() {

    const { TextArea } = Input;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

    const redirectHome = this.state.redirectHome;
    if (redirectHome === true) {
      return <Redirect to="/" />
    }
    if (this.props.currentUser.role === "ROLE_USER") {
      return (
        <div className="profile">
          <h2> Editare Profil </h2>
          <h3> Nume utilizator : {this.props.currentUser.username}</h3>
          <Form onSubmit={this.handleSubmit} className="profile-form">
            <FormItem
              label="Nume"
              validateStatus={this.state.name.validateStatus}
              help={this.state.name.errorMsg}>
              <Input
                prefix={<Icon type="profile" />}
                size="large"
                name="name"
                type="text"
                value={this.state.name.value}
                placeholder="Nume de utilizator"
                onChange={event => this.handleChange(event, this.validateName)}
              />
            </FormItem>
            <FormItem label="Parola curenta"
              validateStatus={this.state.pw.validateStatus}
              help={this.state.pw.errorMsg}>
              <Input
                prefix={<Icon type="lock" />}
                size="large"
                name="pw"
                type="password"
                value={this.state.pw.value}
                required
                placeholder="Parola curenta"
                onChange={event => this.handleChange(event, this.validatePw)}
              />
            </FormItem>
            <FormItem label=" Parola noua"
              validateStatus={this.state.newpw.validateStatus}
              help={this.state.newpw.errorMsg}>
              <Input
                prefix={<Icon type="lock" />}
                size="large"
                name="newpw"
                type="password"
                value={this.state.newpw.value}
                placeholder="Parola noua"
                onChange={event => this.handleChange(event, this.validateNewPw)}
              />
            </FormItem>
            <FormItem label=" Numar de telefon"
              validateStatus={this.state.phone.validateStatus}
              help={this.state.phone.errorMsg}>
              <Input
                prefix={<Icon type="phone" />}
                size="large"
                name="phone"
                type="number"
                value={this.state.phone.value}
                placeholder="Numar de telefon"
                onChange={event => this.handleChange(event, this.validatePhone)}
              />
            </FormItem>
            <FormItem label="Adresa de email"
              validateStatus={this.state.email.validateStatus}
              help={this.state.email.errorMsg}>
              <Input
                prefix={<Icon type="mail" />}
                size="large"
                name="email"
                type="email"
                value={this.state.email.value}
                placeholder="Adresa de email"
                onChange={event => this.handleChange(event, this.validateEmail)}
              />
            </FormItem>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="profile-form-button"
              disabled={this.isFormInvalid()}
            >
              Salvare
            </Button>
          </Form>
        </div >
      );
    } else {
      return (
        <div className="profile-service">
          <h2> Editare Profil </h2>
          <h3> Nume utilizator : {this.props.currentUser.username}</h3>
          <div className="service__forms">
            <Form onSubmit={this.handleSubmit} className="profile-form">
              <FormItem
                  label="Nume"
                  validateStatus={this.state.name.validateStatus}
                  help={this.state.name.errorMsg}>
                  <Input
                    prefix={<Icon type="profile" />}
                    size="large"
                    name="name"
                    type="text"
                    value={this.state.name.value}
                    placeholder="Nume de utilizator"
                    onChange={event => this.handleChange(event, this.validateName)}
                  />
                  </FormItem>
              <FormItem label="Parola curenta:"
                validateStatus={this.state.pw.validateStatus}
                help={this.state.pw.errorMsg}>
                <Input
                  prefix={<Icon type="lock" />}
                  size="large"
                  name="pw"
                  type="password"
                  value={this.state.pw.value}
                  placeholder="Parola curenta"
                  onChange={event => this.handleChange(event, this.validatePw)}
                />
              </FormItem>
              <FormItem label="Parola noua:"
                validateStatus={this.state.newpw.validateStatus}
                help={this.state.newpw.errorMsg}>
                <Input
                  prefix={<Icon type="lock" />}
                  size="large"
                  name="newpw"
                  type="password"
                  value={this.state.newpw.value}
                  placeholder="Parola noua"
                  onChange={event => this.handleChange(event, this.validateNewPw)}

                />
              </FormItem>
              <FormItem label="Numar de telefon:"
                validateStatus={this.state.phone.validateStatus}
                help={this.state.phone.errorMsg}>
                <Input
                  prefix={<Icon type="phone" />}
                  size="large"
                  name="phone"
                  type="number"
                  value={this.state.phone.value}
                  placeholder="Numar de telefon"
                  onChange={event => this.handleChange(event, this.validatePhone)}

                />
              </FormItem>
              <FormItem label="Adresa de email:"
                  validateStatus={this.state.email.validateStatus}
                  help={this.state.email.errorMsg}>
                  <Input
                    prefix={<Icon type="mail" />}
                    size="large"
                    name="email"
                    type="email"
                    value={this.state.email.value}
                    placeholder="Adresa de email"
                    onChange={event => this.handleChange(event, this.validateEmail)}

                  />
                </FormItem>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="profile-form-button"
              >
                Salvare
              </Button>
            </Form>

            <Form onSubmit={this.handleSubmit}>
              <FormItem label="Nume firma:"
              validateStatus={this.state.society.validateStatus}
              help={this.state.society.errorMsg}>
              <Input
                prefix={<Icon type="user" />}
                size="large"
                name="society"
                type="text"
                value={this.state.society.value}
                placeholder="Nume firma"
                onChange={event => this.handleChange(event, this.validateCompanyName)}
              />
              </FormItem>
              <FormItem label="Adresa"
                validateStatus={this.state.address.validateStatus}
                help={this.state.address.errorMsg}>
                <Input
                  prefix={<Icon type="search" />}
                  size="large"
                  name="address"
                  type="text"
                  value={this.state.address.value}
                  placeholder="Adresa firma"
                  onChange={event => this.handleChange(event, this.validateCompanyAddress)}
              />
                </FormItem>
              <FormItem label="Poza profil service">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleImageChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </FormItem>
              <FormItem label="Descriere Service"
                  help={this.state.companyDescription.errorMsg}>
                  <Input
                    prefix={<Icon type="align-center" />}
                    size="large"
                    name="companyDescription"
                    type="text"
                    value={this.state.companyDescription.value}
                    placeholder="Descrierea Service"
                    onChange={event => this.handleChange(event, this.validateCompanyDescription)}
                  />
                </FormItem>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="profile-form-button"
                >
                  Salvare
              </Button>
            </Form>
          </div>
        </div>
      );
    }
  }
  validateName = name => {
    if (name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Numele este prea scurt (Minim ${NAME_MIN_LENGTH} caractere necesare.)`
      };
    } else if (name.length > NAME_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Numele este prea lung (Maxim ${NAME_MAX_LENGTH} caractere.)`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };

  validatePhone = phone => {
    if (phone.length < PHONE_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Numarul de telefon este prea scurt.`
      };
    } else if (phone.length > PHONE_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Numarul de telefon este prea lung.`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };

  validateEmail = email => {
    if (!email) {
      return {
        validateStatus: "error",
        errorMsg: "Emailul este obligatoriu"
      };
    }

    const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: "error",
        errorMsg: "Email nu este valid"
      };
    }

    if (email.length > EMAIL_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Emailul este prea lung`
      };
    }

    return {
      validateStatus: 'success',
      errorMsg: null
    };
  };

  validatePw = pw => {
    if (!pw) {
      return {
        validateStatus: "error",
        errorMsg: "Parola actuala este obligatorie"
      };
    }
    if (pw.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Parola este prea scurta`
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null
    };
  }


  validateNewPw = newpw => {
    if (!newpw) {
      return {
        validateStatus: "error",
        errorMsg: "Parola noua este obligatorie"
      };
    }
    if (newpw === this.state.pw.value) {
      return {
        validateStatus: "error",
        errorMsg: "Parola noua trebuie sa fie diferita de parola actuala"
      };
    }
    if (newpw.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Parola este prea scurta`
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null
    };
  }

  validateCompanyName = society => {
    if (society.length < 4) {
      return {
        validateStatus: "error",
        errorMsg: `Numele companiei este prea scurt`
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null
    };
  }

  validateCompanyAddress = address => {
    if (address.length < 4) {
      return {
        validateStatus: "error",
        errorMsg: `Adresa companiei este prea scurta`
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null
    };
  }

  validateCompanyDescription = companyDescription => {
    if (companyDescription.length < 10) {
      return {
        validateStatus: "error",
        errorMsg: `Descrierea companiei trebuie sa fie mai lunga.`
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null
    };
  }
}




export default Profile;
