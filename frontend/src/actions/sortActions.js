export const SORTBY_DATE = "DATE"
export const SORTBY_VOTE = "VOTE"

export const sortByDate = () => {
  return {
    type: SORTBY_DATE
  }
}

export const sortByVote = () => {
  return {
    type: SORTBY_VOTE
  }
}
