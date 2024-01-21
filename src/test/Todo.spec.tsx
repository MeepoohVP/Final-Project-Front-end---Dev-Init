import { render, screen, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom";
import Todo from '../Todo';
import mediaQuery from "css-mediaquery";
describe('Page Load and Rendering', () => {
  it("render Todo"), () => {
    expect(render(<Todo/>))
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
    render(<Todo />)
  })
  it("click edit"), () =>{
    const { getByText } = render(<Todo />)
    const edit = getByText("edit")
    expect(getByText('แก้ไขสิ่งที่ต้องทำ')).not.toBeInTheDocument()
    fireEvent.click(edit)
    expect(getByText('แก้ไขสิ่งที่ต้องทำ')).toBeInTheDocument()
  }
  it("click create"), () => {
    const { getByText, getByTestId } = render(<Todo />);
    const create = getByTestId("create")
    expect(getByText('ลิสต์สิ่งที่ต้องทำ')).not.toBeInTheDocument()
    fireEvent.click(create)
    expect(getByText("ลิสต์สิ่งที่ต้องทำ")).toBeInTheDocument()
  }
  })

describe('responsive design',() => {
  beforeEach(() => {
    render(<Todo />)
  })
  it("Tablet, laptop, pc"), () => {
    resizeScreenSize(1024)
    expect(screen.getByTestId('todo-area')).toHaveStyle({width: "50%"})
  }
  it("mobile"), () => {
    resizeScreenSize(700)
    expect(screen.getByTestId('todo-area')).toHaveStyle({width: "auto"})
  }
})

describe('Specific Functional Testing', () => {
  it("Submit create"), () => {
    const {getByPlaceholderText, getByTestId, getByText} = render(<Todo/>)
    fireEvent.change(getByPlaceholderText(/สิ่งที่ต้องทำ/i), {target: { value: "new todo" }})
    fireEvent.click(getByTestId("submit-create"))
    expect(getByText("new todo")).toBeInTheDocument()
  }
  it("Submit edit"), () => {
    const {getByPlaceholderText, getByTestId, getByText} = render(<Todo/>)
    fireEvent.change(getByPlaceholderText(/สิ่งที่ต้องทำ/i), {target: { value: "new todo" }})
    fireEvent.click(getByTestId("submit-create"))
    expect(getByText("new todo")).toBeInTheDocument()
    fireEvent.change(getByPlaceholderText(/edit/i), {target: { value: "change todo" }})
    fireEvent.click(getByTestId("edit-confirm"))
    expect(getByText("new todo")).not.toHaveTextContent('new todo')
    expect(getByText("change todo")).toHaveTextContent('change todo')
  }
  it("test save data"), () => {
    const {getByTestId} = render(<Todo/>)
    expect(getByTestId("todo-area")).toHaveLength(3)
    const reloadFn = () => {
      window.location.reload();
    };
    reloadFn()
    expect(getByTestId("todo-area")).toHaveLength(3)
  }
})