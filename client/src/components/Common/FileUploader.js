import React, {useRef} from "react";
import { Button, Form } from "semantic-ui-react";
import {onFileSelectSuccess, onFileSelectError} from "../Common/commonMessage";

const FileUploader = ({onFileSelect}) => {
    const fileInput = useRef(null);

    const handleFileInput = (e) => {
        //handle validation
        const file = e.target.files[0];
        if (file.size > 1024)
          onFileSelectError({ error: "File size cannot exceed more than 1MB" });
        else onFileSelectSuccess(file);
    };

    return (
        
        <Form>
            <Form.Input type="file" onChange={handleFileInput} />
            {/* <Button color="teal" onClick={e => fileInput.current && fileInput.current.click()} /> */}
        </Form>
    )
};

export default FileUploader;