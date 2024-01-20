import { render, screen, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom";
import Todo from '../Todo';
import mediaQuery from "css-mediaquery";
describe('Page Load and Rendering', () => {
  it("render Todo"), () => {
    render(<Todo/>)
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
    const { getByText } = render(<Todo />);
    const create = render(<Todo/>).getByTestId("create")
    expect(getByText('ลิสต์สิ่งที่ต้องทำ')).not.toBeInTheDocument()
    fireEvent.click(create)
    expect(getByText("ลิสต์สิ่งที่ต้องทำ")).toBeInTheDocument()
  }
  })

describe('responsive design',() => {
  it("Tablet, laptop, pc"), () => {
    resizeScreenSize(1024)
    render(<Todo/>)
    expect(screen.getByTestId('todo-area')).toHaveStyle({width: "50%"})
  }
  it("mobile"), () => {
    resizeScreenSize(700)
    render(<Todo/>)
    expect(screen.getAllByTestId('todo-area')).toHaveStyle({width: "auto"})
  }
})