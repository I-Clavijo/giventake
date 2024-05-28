import styled from 'styled-components'

export const $Wrapper = styled.div`
  h2.pageTitle {
    font-weight: 500;
    font-size: 1.3em;
  }
  .tblPostsReports {
    background-color: #efefef;

    .tblReports {
      background-color: #fff;
    }
  }
`

export const $Tabs = styled.div`
  border-bottom: 0.1em solid #eee;
  height: fit-content;
`

export const $TabItem = styled.button`
  font-weight: 500;
  padding: 0.8em;
  border-bottom: 0.2em solid transparent;

  ${({ $isActive }) =>
    $isActive &&
    `
        border-bottom: .2em solid var(--third-color);
        color: var(--third-color);
    `}
  &:hover {
    color: var(--third-color);
  }
`
