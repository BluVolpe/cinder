import React from "react";
import { Header, Message } from "semantic-ui-react";
import Form from "react-bootstrap/Form";
import "../styles/style.css"

export const PageOne = () => {
  return (
    <>
      <Message className="message-container" size="huge" secondary="true">
        <Header size="huge"> Personal User Statistics </Header>
        <p>Select movie genres</p>
      </Message>

      <Form>
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label=" Action"
              name="action"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label=" Adventure"
              name="adventure"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label=" Animation"
              name="animation"
              type={type}
              id={`inline-${type}-1`}
            />
          </div>
        ))}
      </Form>

      <Form>
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label=" Comedy"
              name="comedy"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label=" Drama"
              name="drama"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label=" Family"
              name="family"
              type={type}
              id={`inline-${type}-1`}
            />
          </div>
        ))}
      </Form>

      <Form>
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label=" Fantasy"
              name="fantasy"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label=" Horror"
              name="horror"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label=" Musical"
              name="musical"
              type={type}
              id={`inline-${type}-1`}
            />
          </div>
        ))}
      </Form>

      <Form>
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label=" Mystery"
              name="mystery"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label=" Romance"
              name="romance"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label=" Thriller"
              name="thriller"
              type={type}
              id={`inline-${type}-1`}
            />
          </div>
        ))}
      </Form>
    </>
  );
};

export default PageOne;
