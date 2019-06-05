import React from "react";
import { useStorybook } from "./useStorybook";
import "./App.css";

const App: React.FC = () => {
  const [Storybook, CurrentChapter, TableOfContents] = useStorybook("useState");
  return (
    <div className="app">
      <h1 className="heading">Snow White and the Seven React Hooks</h1>
      <Storybook>
        <TableOfContents />
        <CurrentChapter />
      </Storybook>
    </div>
  );
};

export default App;
