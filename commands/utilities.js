async function findRow(arg, sheet) {
    let targetRows = [];
    let rows = await sheet.getRows();
    await sheet.loadCells(`A2:F${rows.length + 1}`);
    for (let i = 1; i < rows.length + 1; i++)
        for (let j = 0; j < 6; j++)
            if (arg === sheet.getCell(i, j).value.toString())
                if (!targetRows.includes(rows[i - 1]))
                    targetRows.push(rows[i - 1]);
    return targetRows;
}