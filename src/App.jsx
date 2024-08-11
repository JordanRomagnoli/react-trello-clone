import React from "react";
import { Header, Groups } from "./containers";
import { ScrollXContainer } from "./components";

const App = () => {
    return (
        <>
            <Header />
            <section className="px-10">
                <ScrollXContainer>
                    <Groups />
                </ScrollXContainer>
            </section>
        </>
    );
};

export default App;
