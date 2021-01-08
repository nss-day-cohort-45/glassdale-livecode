export const WitnessHTMLConverter = (witnessObject) => {
  return `
      <section class="witness">
          <div class="witness__name"><span class="statementLabel">Witness:</span> ${ witnessObject.name }</div>
          <div class="witness__statement"><span class="statementLabel">Statement:</span> ${ witnessObject.statements}</div>
      </section>
  `
}
