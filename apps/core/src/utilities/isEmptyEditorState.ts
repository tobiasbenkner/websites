import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

function hasTextContent(node: SerializedLexicalNode): boolean {
  // Text-Node prüfen
  if (node.type === 'text') {
    const textNode = node as any
    return !!(textNode.text && textNode.text.trim().length > 0)
  }

  // Element-Node: rekursiv prüfen
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.some((child) => hasTextContent(child))
  }

  // Andere Content-Nodes (außer paragraph/root) sind nicht leer
  if (node.type !== 'paragraph' && node.type !== 'root') {
    return true
  }

  return false
}

export function isEmptyRichText(richTextValue: SerializedEditorState | null | undefined): boolean {
  if (!richTextValue?.root) {
    return true
  }

  return !hasTextContent(richTextValue.root)
}
