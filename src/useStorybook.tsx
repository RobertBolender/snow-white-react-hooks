import React, { useContext, useState } from "react";
import { UseState } from "./chapters";
import "./storybook.css";

type storybookContextType = {
  currentChapter: string;
  setCurrentChapter: any;
} | null;

const storybookContext = React.createContext<storybookContextType>(null);
export const StorybookProvider = storybookContext.Provider;
export const useStorybookContext = () => useContext(storybookContext);

const Chapters = [
  { key: "useState", Component: UseState, character: "Snow White" },
  { key: "useEffect", character: "Prince Charming" },
  { key: "useContext", character: "The Evil Queen" },
  { key: "useReducer", character: "Doc" },
  { key: "useCallback", character: "Sneezy" },
  { key: "useMemo", character: "Bashful" },
  { key: "useRef", character: "Happy" },
  { key: "useImperativeHandle", character: "Grumpy" },
  { key: "useLayoutEffect", character: "Sleepy" },
  { key: "useDebugValue", character: "Dopey" }
];

const Storybook: React.FC = ({ children }) => {
  const [currentChapter, setCurrentChapter] = useState("useState");
  return (
    <StorybookProvider value={{ currentChapter, setCurrentChapter }}>
      {children}
    </StorybookProvider>
  );
};

const TableOfContents: React.FC = () => {
  const { currentChapter, setCurrentChapter } = useStorybookContext() as any;
  return (
    <dl className="table-of-contents">
      {Chapters.map(({ key, character }) => {
        return (
          <>
            <dt
              onClick={() => setCurrentChapter(key)}
              className={`dt ${key === currentChapter ? "active" : ""}`}
            >
              {key}
            </dt>
            <dd
              onClick={() => setCurrentChapter(key)}
              className={`dd ${key === currentChapter ? "active" : ""}`}
            >
              as {character}
            </dd>
          </>
        );
      })}
    </dl>
  );
};

const CurrentChapter: React.FC = () => {
  const { currentChapter, setCurrentChapter } = useStorybookContext() as any;
  const chapterHasComponent = Chapters.find(
    ({ key }) => key === currentChapter
  );
  if (chapterHasComponent && chapterHasComponent.Component) {
    const Component = chapterHasComponent.Component;
    return <Component />;
  } else {
    return <p>Current Chapter: {currentChapter}</p>;
  }
};

export const useStorybook = (
  initialChapter: string
): [React.FC, React.FC, React.FC] => {
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  return [Storybook, CurrentChapter, TableOfContents];
};
