function toButton(button) {
  return `
    <div 
    class="button ${button.active ? 'active' : ''}"
    data-type="toolbar-button"
    data-value='${JSON.stringify(button.value)}'
    >
      <i class="material-icons">${button.icon}</i>
    </div>
  `
}

export function createToolbar(state) {
  const getDecorationValue = toggleDecoration.bind(this, state.textDecoration)
  const buttons = [
    {
      icon: 'format_align_left',
      active: state.textAlign === 'left',
      value: { textAlign: 'left' },
    },
    {
      icon: 'format_align_center',
      active: state.textAlign === 'center',
      value: { textAlign: 'center' },
    },
    {
      icon: 'format_align_right',
      active: state.textAlign === 'right',
      value: { textAlign: 'right' },
    },
    {
      icon: 'format_bold',
      active: state.fontWeight === 'bold',
      value: { fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold' },
    },
    {
      icon: 'format_italic',
      active: state.fontStyle === 'italic',
      value: { fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic' },
    },
    {
      icon: 'strikethrough_s',
      active: state.textDecoration.includes('line-through'),
      value: getDecorationValue('line-through'),
    },
    {
      icon: 'format_overline',
      active: state.textDecoration.includes('overline'),
      value: getDecorationValue('overline'),
    },
    {
      icon: 'format_underlined',
      active: state.textDecoration.includes('underline'),
      value: getDecorationValue('underline'),
    },
  ]

  return buttons.map(toButton).join('')
}

function toggleDecoration(current, toggle) {
  return {
    textDecoration: current.includes(toggle)
      ? current.replace(toggle, '').trim()
      : `${current} ${toggle}`.trim(),
  }
}
