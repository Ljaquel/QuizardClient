const RemoveTypename = (obj) => {
  let copy = {...obj}
  delete copy.__typename
  
  let content = [...obj.content]

  for (let i = 0; i < content.length; i++) {
    let question = {...content[i]}
    delete question.__typename
    content[i] = question
  }

  let stats = {...obj.stats}
  delete stats.__typename

  let style = {...obj.style}
  delete style.__typename

  copy.style = style
  copy.stats = stats
  copy.content = content
  return copy
}

export { RemoveTypename }