import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import DeleteSelfPage from "../components/auth/DeleteSelfPage.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/DeleteSelfPage">
                <DeleteSelfPage/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews