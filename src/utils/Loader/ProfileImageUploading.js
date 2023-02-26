import React from "react"
import ContentLoader from "react-content-loader"

const ProfileImageUploading = () => (
    <ContentLoader
        speed={2}
        viewBox="0 0 108 108"
        backgroundColor="#636363"
        foregroundColor="#3d3d3d"
        className="w-24 h-24"
    >
        <circle cx="54" cy="54" r="54" />
    </ContentLoader>
)

export default ProfileImageUploading