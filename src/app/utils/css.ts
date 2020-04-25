export function setCssVariable(propertyName: string, value: any) {
    document.documentElement.style.setProperty(propertyName, value);
}
