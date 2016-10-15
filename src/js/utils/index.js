export let findInstrumentById = (instruments, id) => {
    for (var i = 0; i < instruments.length; i++) {
        if (instruments[i].id === id) {
            return instruments[i];
        }
    }

    return null;
}