import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import DeleteSelfPage from "../components/auth/DeleteSelfPage.jsx";
import App from "../App.jsx";
import {Button} from "../components/common/Button.jsx";
import ErrorPage from "../components/common/ErrorPage.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/DeleteSelfPage">
                <DeleteSelfPage/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Button">
                <Button/>
            </ComponentPreview>
            <ComponentPreview path="/ErrorPage">
                <ErrorPage/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews