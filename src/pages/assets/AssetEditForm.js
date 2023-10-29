import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/ProjectCreateUpdate.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Alert, Image } from "react-bootstrap";
import Placeholder from "../../components/Placeholder";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axios.Defaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

function AssetEditForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const history = useHistory();
  // const location = useLocation(); // used to pass the project_id from
  // the button "Add Asset" in Project.js

  const [assetData, setAssetData] = useState({
    asset_name: "",
    category: "",
    description: "",
    image: "",
    assetfile: "",
    project_id: "",
  });
  const { asset_name, category, description, image, project_id } =
    assetData;

  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/assets/${id}/`);
        const {
          asset_name,
          category,
          description,
          image,
          is_owner,
          project_id,
        } = data;

        is_owner
          ? setAssetData({
              asset_name,
              category,
              description,
              image,
              project_id,
            })
          : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const imageInput = useRef(null);

  const handleChange = (event) => {
    setAssetData({
      ...assetData,
      // computed name property - creates key - value pair
      // between brackets sets the key - [event.target.name]
      // after the colon sets the value - : event.target.value
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setAssetData({
        ...assetData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("project_id", project_id);
    formData.append("asset_name", asset_name);
    formData.append("category", category);
    formData.append("description", description);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/assets/${id}/`, formData);
      history.push(`/assets/${id}`);
    } catch (err) {
      // console.log(err);

      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>
          <h5>Asset name:</h5>
        </Form.Label>
        <Form.Control
          as="input"
          name="asset_name"
          value={asset_name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.asset_name?.map((message, idx) => (
        <Alert
          variant="danger"
          key={idx}
        >
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>
          <h5>Category:</h5>
        </Form.Label>
        <Form.Control
          id="category"
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
        >
          <option>graphic</option>
          <option>video</option>
          <option>audio</option>
          <option>copywriting</option>
          <option>other</option>
        </Form.Control>
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert
          variant="danger"
          key={idx}
        >
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>
          <h5>Description</h5>
        </Form.Label>
        <Form.Control
          type="textarea"
          name="description"
          value={description}
          onChange={handleChange}
          rows={3}
        />
      </Form.Group>
      {errors?.start_date?.map((message, idx) => (
        <Alert
          variant="danger"
          key={idx}
        >
          {message}
        </Alert>
      ))}

      <Row>
        <Col>
          <Button
            type="submit"
            variant="warning"
            block
          >
            save
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => history.goBack()}
            variant="secondary"
            block
          >
            cancel
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col
            sm={12}
            lg={6}
          >
            <Container>
              <Form.Group className={`${styles.Boxbackground}`}>
                {image ? (
                  <>
                    <figure>
                      <Image
                        className={styles.FillerImage}
                        src={image}
                        alt={asset_name}
                        fluid
                      />
                    </figure>
                    <div>
                      <Col>
                        <Form.Label
                          className={`${btnStyles.Button} ${btnStyles.Yellow} btn`}
                          htmlFor="image-upload"
                        >
                          Change project image
                        </Form.Label>
                      </Col>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <Placeholder
                      src={<UploadFileIcon />}
                      message="Click or tap to upload a Cover Image"
                    />
                  </Form.Label>
                )}
                <Form.File
                  className={styles.FormControl}
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  display="none"
                  ref={imageInput}
                />
              </Form.Group>
              {errors?.image?.map((message, idx) => (
                <Alert
                  variant="danger"
                  key={idx}
                >
                  {message}
                </Alert>
              ))}
              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
          <Col className="d-none d-md-block p-0 p-md-2">
            <Container>{textFields}</Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AssetEditForm;
