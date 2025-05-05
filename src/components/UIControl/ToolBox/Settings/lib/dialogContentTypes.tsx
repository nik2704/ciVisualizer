export type DialogContentProps = {
  showLinkTypeChecked?: boolean,
  showLinkColorChecked?: boolean,
  LinkTypeIdx: number,
  strokeWidth: number,
  setStrokeWidth: (newWidth: number) => void,
  setShowLinkColorChecked: (isChecked: boolean) => void,
  setShowLinkTypeChecked: (isChecked: boolean) => void,
  setLinkTypeIdx: (newLinkType: number) => void,
};
