import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home.jsx";

import AGMTestBox from "../pages/Instrument/AGMTestBox.mdx";
import Chroma2238 from "../pages/Instrument/Chroma2238.mdx";
import DAQ from "../pages/Instrument/DAQ.mdx";
import DMM from "../pages/Instrument/DMM.mdx";
import GraphicsDiscreteIO from "../pages/Instrument/GraphicsDiscreteIO.mdx";
import InterfaceBox from "../pages/Instrument/InterfaceBox.mdx";
import MUX from "../pages/Instrument/MUX.mdx";
import MxFoundation from "../pages/Instrument/MxFoundation.mdx";
import Photometer from "../pages/Instrument/Photometer.mdx";
import PickeringRelay from "../pages/Instrument/PickeringRelay.mdx";
import PowerSupply from "../pages/Instrument/PowerSupply.mdx";
import Relay from "../pages/Instrument/Relay.mdx";
import SerialUART from "../pages/Instrument/SerialUART.mdx";

function DocumentationRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/instrument/agm-test-box" element={<AGMTestBox />} />
            <Route path="/instrument/chroma2238" element={<Chroma2238 />} />
            <Route path="/instrument/daq" element={<DAQ />} />
            <Route path="/instrument/dmm" element={<DMM />} />
            <Route path="/instrument/graphics-discrete-io" element={<GraphicsDiscreteIO />} />
            <Route path="/instrument/interface-box" element={<InterfaceBox />} />
            <Route path="/instrument/mux" element={<MUX />} />
            <Route path="/instrument/mx-foundation" element={<MxFoundation />} />
            <Route path="/instrument/photometer" element={<Photometer />} />
            <Route path="/instrument/pickering-relay" element={<PickeringRelay />} />
            <Route path="/instrument/power-supply" element={<PowerSupply />} />
            <Route path="/instrument/relay" element={<Relay />} />
            <Route path="/instrument/serial-uart" element={<SerialUART />} />

            <Route path="*" element={<section>
                <h1>Page Not Found</h1>
                <p>The requested documentation page could not be found.</p>
            </section>
            }
            />
        </Routes>
    );
}

export default DocumentationRoutes;
