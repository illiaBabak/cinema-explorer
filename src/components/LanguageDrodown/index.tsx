import { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { PageAction, pageSetCurrentLanguage, pageSetLanguages } from 'src/actions/pageActions';
import { getLanguages } from 'src/api/languages';
import { PageInitialStateType } from 'src/reducers/pageReducer';
import { isoMapping } from 'src/utils/constants';

const convertIso = (countryCode: string): string | null => isoMapping[countryCode] || null;

const mapStateToProps = (state: { page: PageInitialStateType }) => ({
  language: state.page.currentLanguage,
  languages: state.page.languages,
});

const mapDispatchToProps = (dispatch: Dispatch<PageAction>) => ({
  setLanguage: (language: string) => dispatch(pageSetCurrentLanguage(language)),
  setLanguages: (languages: string[]) => dispatch(pageSetLanguages(languages)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class LanguageDropdown extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;

  setLanguages = async () => {
    const languages = await getLanguages();

    this.props.setLanguages(languages);
  };

  handleChangeLanguage = (language: string) => {
    this.props.setLanguage(language);

    const params = new URLSearchParams(window.location.search);
    params.set('language', language);

    window.location.search = params.toString();
  };

  componentDidMount(): void {
    if (!this.isInitialized) return;

    this.isInitialized = false;

    this.setLanguages();
  }

  render(): JSX.Element {
    const { language, languages } = this.props;

    return (
      <Dropdown
        onSelect={(eKey) => this.handleChangeLanguage(eKey ?? language)}
        className='dropdown'
      >
        <Dropdown.Toggle variant=''>
          <img
            src={`https://flagsapi.com/${convertIso(language)}/flat/64.png`}
            alt='flag'
            className='flag object-fit-contain me-2'
            onError={({ currentTarget }) => {
              currentTarget.src = '/images/unknown-flag.png';
              currentTarget.onerror = null; // prevents looping
            }}
          />
          {language}
        </Dropdown.Toggle>
        <Dropdown.Menu className='dropdown-menu scroll-container-y'>
          {languages.map((language, index) => (
            <Dropdown.Item eventKey={language} key={`language-${index}-${language}`}>
              <img
                src={`https://flagsapi.com/${convertIso(language)}/flat/64.png`}
                alt='flag'
                className='flag object-fit-contain me-2'
                onError={({ currentTarget }) => {
                  currentTarget.src = '/images/unknown-flag.png';
                  currentTarget.onerror = null; // prevents looping
                }}
              />
              {language}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default connector(LanguageDropdown);
