import React from "react"
import ContentLoader from "react-content-loader"

const ListLoader = () => (
    <ContentLoader
        speed={5}
        width={410}
        height={160}
        viewBox="0 0 410 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#1DB954"
    >
        <rect x="62" y="11" rx="3" ry="3" width="300" height="6" />
        <rect x="62" y="27" rx="3" ry="3" width="250" height="6" />
        <rect x="62" y="43" rx="3" ry="3" width="200" height="6" />
        <rect x="2" y="10" rx="0" ry="0" width="52" height="38" />
    </ContentLoader>

)

export default ListLoader