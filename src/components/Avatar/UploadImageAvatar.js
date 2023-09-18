import React, { useState } from "react";
import { Avatar, Badge, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import styled from "styled-components";

const UploadImageAvatar = ({
  defaultImage,
  uploadImage,
  avatarSize,
  offsetSize,
  setPictureChangeToggleState,
  name,
}) => {
  const [imageHover, setImageHover] = useState(false);

  return (
    <StyledDiv>
      {name === "AvatarImg" ? (
        <Badge>
          <Avatar
            src={defaultImage ? defaultImage : ""}
            size={avatarSize}
            icon={<UserOutlined />}
          />
        </Badge>
      ) : (
        <Badge
          count={
            <div
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
              className="camera-logo-container"
            >
              <Label>
                <Input type="file" onChange={uploadImage} accept="image/*" />
                <MdEdit className="profile-image-icon" />
              </Label>
            </div>
          }
          offset={[-17, offsetSize]}
        >
          <Avatar
            src={defaultImage ? defaultImage : ""}
            size={avatarSize}
            onClick={() => setPictureChangeToggleState(true)}
            icon={<UserOutlined />}
          />
        </Badge>
      )}
    </StyledDiv>
  );
};

export default UploadImageAvatar;

const StyledDiv = styled.div`
  .camera-logo-container {
    border-radius: 50%;
    /* background: #285feb; */
    background-color: #105f43;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      width: 30px;
      height: 30px;
      .profile-image-icon {
        font-size: 24px;
      }
    }
  }
  .profile-image-icon {
    font-size: 20px;
    color: #fff;
    opacity: 0.5;
    &:hover {
      //   font-size: 24px;
    }
  }
  .profile-image-icon:hover {
    color: #fff;
    opacity: 1;
  }

  .camera-logo-container:hover {
    // transform: scale(1.1);
  }

  .upload-image-icon {
    font-size: 20px;
    color: #fff;
    opacity: 0.5;
  }

  .upload-image-icon-hovered {
    font-size: 20px;
    color: #fff;
    opacity: 1;
  }

  .profile-image-icon {
    cursor: pointer;
    font-size: 20px;
    color: #fff;
    opacity: 0.5;
  }
`;

const Label = styled.label`
  input[type="file"] {
    display: none;
  }
`;
