import { render, screen, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom";
import Note from '../Note';
import mediaQuery from "css-mediaquery";
describe('Page Load and Rendering', () => {
  it("render Note"), () => {
    render(<Note/>)
  }
})

function createMatchMedia(width: number) {
  return (query:any) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: "",
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
}

function resizeScreenSize(width:number) {
  window.matchMedia = createMatchMedia(width);
}
describe('User Interaction', () => {
  beforeEach(() => {
    render(<Note />)
  })
  it("click create and edit"), () =>{
    const { getByPlaceholderText } = render(<Note />)
    const edit = getByPlaceholderText("Topic")
    expect(getByPlaceholderText('Topic')).not.toBeInTheDocument()
    fireEvent.click(edit)
    expect(getByPlaceholderText('Topic')).toBeInTheDocument()
  }
  }) 
describe('responsive design',() => {
  beforeEach(() => {
    render(<Note />)
  })
  it("Tablet, laptop, pc"), () => {
    resizeScreenSize(1024)
    expect(screen.getByTestId('note-area')).toHaveStyle({display: "flex"})
  }
  it("mobile"), () => {
    resizeScreenSize(700)
    expect(screen.getByTestId('note-area')).toHaveStyle({display: "block"})
  }
})

describe('Specific Functional Testing', () => {
  it("Submit create"), () => {
    const {getByPlaceholderText, getByTestId, getByText} = render(<Note/>)
    fireEvent.change(getByPlaceholderText(/Topic/i), {target: { value: "new note" }})
    fireEvent.click(getByTestId("submit-create"))
    expect(getByText("new note")).toBeInTheDocument()
  }
  it("Submit edit"), () => {
    const {getByTestId, getByText} = render(<Note/>)
    fireEvent.change(getByTestId("create"), {target: { value: "new note" }})
    fireEvent.click(getByTestId("submit-create"))
    expect(getByText("new note")).toBeInTheDocument()
    fireEvent.change(getByTestId("edit"), {target: { value: "change note" }})
    fireEvent.click(getByTestId("edit-confirm"))
    expect(getByText("new note")).not.toBeInTheDocument()
    expect(getByText("change note")).toBeInTheDocument()
  }
  it("click delete"), () => {
    const {getByPlaceholderText, getByTestId, getByText} = render(<Note/>)
    fireEvent.change(getByPlaceholderText(/สิ่งที่ต้องทำ/i), {target: { value: "new note" }})
    fireEvent.click(getByTestId("submit-create"))
    expect(getByText("new note")).toBeInTheDocument()
    fireEvent.click(getByText("delete"))
    expect(getByText("new note")).not.toBeInTheDocument()
  }
  it("test save data"), () => {
    const {getByTestId} = render(<Note/>)
    expect(getByTestId("note-area")).toHaveLength(3)
    const reloadFn = () => {
      window.location.reload();
    };
    reloadFn()
    expect(getByTestId("note-area")).toHaveLength(3)
  }
})