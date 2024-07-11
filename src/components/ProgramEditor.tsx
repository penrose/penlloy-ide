import { EditorPane } from "@penrose/components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentDiagramState,
  currentDirtyStyleProgramState,
  currentDomainCacheSelector,
  currentProgramSelector,
} from "../state/atoms.js";

export const StyleEditor = (): JSX.Element => {
  const [dirtyProgramContent, setDirtyProgramContent] = useRecoilState(
    currentDirtyStyleProgramState
  );
  const domainCache = useRecoilValue(currentDomainCacheSelector);

  const [diagram] = useRecoilState(currentDiagramState);
  const { error, warnings } = diagram;

  return (
    <EditorPane
      value={dirtyProgramContent}
      vimMode={false}
      languageType="style"
      domainCache={domainCache}
      onChange={setDirtyProgramContent}
      readOnly={false}
      onWrite={() => {}}
      error={error}
      warnings={warnings}
    />
  );
};

export const NonStyleEditor = ({
  languageType,
}: {
  languageType: "substance" | "domain";
}): JSX.Element => {
  const [programContent, setProgramContent] = useRecoilState(
    currentProgramSelector(languageType)
  );
  const domainCache = useRecoilValue(currentDomainCacheSelector);

  const [diagram] = useRecoilState(currentDiagramState);
  const { error, warnings } = diagram;

  return (
    <EditorPane
      value={programContent}
      vimMode={false}
      languageType={languageType}
      domainCache={domainCache}
      onChange={setProgramContent}
      readOnly={true}
      onWrite={() => {}}
      error={error}
      warnings={warnings}
    />
  );
};
