import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  FormHelperText,
  Chip,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from '@mui/material';
import PageHero from '../components/PageHero';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { loadPaystack } from '../services/paystack';
import { getApiEndpoint, locationApi, membershipApi } from '../services/api';
import {
  getMembershipAmount,
  isFreeRegistrationPeriod,
  membershipCategories,
  membershipPlans,
} from '../data/membershipPlans';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  border: '1px solid #dce3dc',
  borderRadius: 8,
  background: 'linear-gradient(145deg, #ffffff 0%, #fbfcf9 100%)',
  boxShadow: '0 12px 30px rgba(16, 59, 41, 0.07)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const MembershipCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  border: '1px solid',
  borderColor: selected ? theme.palette.primary.main : theme.palette.primary.light,
  cursor: 'pointer',
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.secondary.main}`,
    outlineOffset: 2,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: theme.palette.primary.main,
    '& .category-box': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

const aspirantSectionTitles = [
  'Section A · Personal details',
  'Section B · DEP-BUS membership',
  'Section C · Position applied for',
  'Section D · Electoral area',
  'Section E · Special category',
  'Section F · Education, profession & experience',
  'Section G · Leadership & community engagement',
  'Section H · Motivation for seeking the DEP-BUS ticket',
  'Section I · Political & electoral information',
  'Section J · Campaign & organisational capacity',
  'Section K · Commitment to DEP-BUS',
  'Section M · Document attachments',
];

const JoinUs = () => {
  const [searchParams] = useSearchParams();
  const stepperContainerRef = useRef(null);
  const activeStepRef = useRef(null);
  const requestedPlan = searchParams.get('plan');
  const requestedCategory = searchParams.get('category');
  const requestedCategoryIsValid = membershipCategories.some(({ id }) => id === requestedCategory);
  const initialCategory = requestedCategoryIsValid ? requestedCategory : 'general';
  const initialPlan = membershipPlans.find((plan) => (
    plan.id === requestedPlan || plan.title === requestedPlan
  ));
  const [activeStep, setActiveStep] = useState(initialPlan ? 1 : 0);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan?.id || null);
  const [selectedCategory, setSelectedCategory] = useState(
    initialPlan?.id === 'mwananchi' && initialCategory === 'youth_pwd' ? 'general' : initialCategory
  );
  const [registrationIsFree, setRegistrationIsFree] = useState(isFreeRegistrationPeriod);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(null);
  const [locations, setLocations] = useState({
    counties: [],
    constituencies: [],
    wards: [],
    electoralConstituencies: [],
    electoralWards: [],
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fullName: '',
    nationalIdNumber: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    age: '',
    gender: '',
    occupation: '',
    interests: '',
    county: '',
    subCounty: '',
    postalPhysicalAddress: '',
    constituency: '',
    ward: '',
    electoralCounty: '',
    electoralConstituency: '',
    electoralWard: '',
    membershipStatus: '',
    membershipStatusConfirmed: '',
    membershipReference: '',
  });
  const [aspirantDetails, setAspirantDetails] = useState({
    specialCategories: [],
    disabilityDetails: '',
    educationLevel: '',
    educationOther: '',
    professionalQualifications: '',
    currentOccupation: '',
    currentEmployer: '',
    professionalExperience: '',
    heldPublicLeadership: '',
    previousLeadershipPosition: '',
    previousLeadershipInstitution: '',
    previousLeadershipPeriod: '',
    organisations: '',
    communityContribution: '',
    motivation: '',
    priorityIssueOne: '',
    priorityIssueTwo: '',
    priorityIssueThree: '',
    devolutionVision: '',
    partyContribution: '',
    contestedBefore: '',
    contestedPosition: '',
    contestedYear: '',
    contestedParty: '',
    contestedOutcome: '',
    currentlyHoldsOffice: '',
    currentOfficeDetails: '',
    bankruptcyHistory: '',
    bankruptcyDetails: '',
    criminalProceedings: '',
    criminalProceedingsDetails: '',
    supportNetwork: '',
    volunteerCount: '',
    campaignStructure: '',
    grassrootsStrategy: '',
    upholdPartyValues: '',
    peacefulPolitics: '',
    supportIssueBasedPolitics: '',
    abideByNominationProcess: '',
  });
  const [documentUrls, setDocumentUrls] = useState({
    idDocument: '',
    passportPhoto: '',
    membershipProof: '',
    academicCertificates: '',
    leadershipDocuments: '',
    otherDocuments: '',
  });
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const selectedPlanDetails = membershipPlans.find((plan) => plan.id === selectedPlan);
  const isAspirantPlan = Boolean(selectedPlanDetails && selectedPlan !== 'mwananchi');
  const selectedAmount = getMembershipAmount(selectedPlanDetails, selectedCategory);
  const requiresPayment = selectedAmount > 0 && !registrationIsFree;
  const steps = isAspirantPlan
    ? ['Select membership', ...aspirantSectionTitles, 'Payment']
    : ['Select membership', 'Personal information', 'Payment'];
  const aspirantSectionIndex = Math.min(
    Math.max(activeStep - 1, 0),
    aspirantSectionTitles.length - 1
  );
  const currentSectionLetter = aspirantSectionTitles[aspirantSectionIndex].match(/^Section ([A-M])/)?.[1];
  const isAspirantPaymentStep = isAspirantPlan && activeStep === steps.length - 1;
  const sectionProgress = isAspirantPaymentStep
    ? 100
    : (Math.min(Math.max(activeStep, 0), aspirantSectionTitles.length) / aspirantSectionTitles.length) * 100;
  const membershipReferenceIsValid = /^DEP/.test(formData.membershipReference.trim());
  const getMissingFieldsForStep = (step) => {
    if (step === 1) {
      const requiredFields = isAspirantPlan
        ? ['fullName', 'nationalIdNumber', 'dateOfBirth', 'email', 'phone', 'whatsappNumber', 'subCounty', 'postalPhysicalAddress', 'county', 'constituency', 'ward', 'gender']
        : ['firstName', 'lastName', 'email', 'phone', 'age', 'occupation', 'county', 'constituency', 'ward', 'gender'];
      const missingFields = requiredFields.filter(field => !String(formData[field] || '').trim());
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        missingFields.push('email');
      }
      return missingFields;
    }

    if (isAspirantPlan && step === 2) {
      const requiredFields = ['membershipStatus', 'membershipStatusConfirmed', 'membershipReference'];
      const missingFields = requiredFields.filter(field => !String(formData[field] || '').trim());
      if (!membershipReferenceIsValid) missingFields.push('membershipReference');
      return [...new Set(missingFields)];
    }

    if (isAspirantPlan && step === 4) {
      return ['electoralCounty', 'electoralConstituency', 'electoralWard']
        .filter(field => !formData[field]);
    }

    if (isAspirantPlan && step === 5) {
      const missingFields = aspirantDetails.specialCategories.length ? [] : ['specialCategories'];
      if (aspirantDetails.specialCategories.includes('pwd') && !aspirantDetails.disabilityDetails.trim()) {
        missingFields.push('disabilityDetails');
      }
      return missingFields;
    }

    if (!isAspirantPlan) return [];

    const requiredFieldsByStep = {
      6: ['educationLevel', 'professionalQualifications', 'currentOccupation', 'currentEmployer', 'professionalExperience'],
      7: ['heldPublicLeadership', 'organisations', 'communityContribution'],
      8: ['motivation', 'priorityIssueOne', 'priorityIssueTwo', 'priorityIssueThree', 'devolutionVision', 'partyContribution'],
      9: ['contestedBefore', 'currentlyHoldsOffice', 'bankruptcyHistory', 'criminalProceedings'],
      10: ['supportNetwork', 'volunteerCount', 'campaignStructure', 'grassrootsStrategy'],
      11: ['upholdPartyValues', 'peacefulPolitics', 'supportIssueBasedPolitics', 'abideByNominationProcess'],
    };
    const requiredFields = [...(requiredFieldsByStep[step] || [])];

    if (step === 6 && aspirantDetails.educationLevel === 'other') requiredFields.push('educationOther');
    if (step === 7 && aspirantDetails.heldPublicLeadership === 'yes') {
      requiredFields.push('previousLeadershipPosition', 'previousLeadershipInstitution', 'previousLeadershipPeriod');
    }
    if (step === 9) {
      if (aspirantDetails.contestedBefore === 'yes') {
        requiredFields.push('contestedPosition', 'contestedYear', 'contestedParty', 'contestedOutcome');
      }
      if (aspirantDetails.currentlyHoldsOffice === 'yes') requiredFields.push('currentOfficeDetails');
      if (aspirantDetails.bankruptcyHistory === 'yes') requiredFields.push('bankruptcyDetails');
      if (aspirantDetails.criminalProceedings === 'yes') requiredFields.push('criminalProceedingsDetails');
    }

    if (step === 12) {
      return ['idDocument', 'passportPhoto', 'membershipProof', 'academicCertificates', 'leadershipDocuments', 'otherDocuments']
        .filter(field => !documentUrls[field]);
    }

    return requiredFields.filter(field => !String(aspirantDetails[field] || '').trim());
  };
  const currentStepIncomplete = getMissingFieldsForStep(activeStep).length > 0;

  useEffect(() => {
    const refreshRegistrationPeriod = () => setRegistrationIsFree(isFreeRegistrationPeriod());
    const timer = window.setInterval(refreshRegistrationPeriod, 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isAspirantPlan || !stepperContainerRef.current || !activeStepRef.current) return;
    const container = stepperContainerRef.current;
    const activeStepElement = activeStepRef.current;
    const stepCenter = activeStepElement.getBoundingClientRect().left
      - container.getBoundingClientRect().left
      + container.scrollLeft
      + activeStepElement.clientWidth / 2;
    container.scrollLeft = stepCenter - container.clientWidth / 2;
  }, [activeStep, isAspirantPlan]);

  // Fetch counties on component mount
  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const data = await locationApi.getCounties();
        const countiesList = Array.isArray(data) ? data : data.results || [];
        setLocations(prev => ({ 
          ...prev, 
          counties: countiesList
        }));
      } catch (error) {
        console.error('Error fetching counties:', error);
        setLocations(prev => ({ ...prev, counties: [] }));
      }
    };
    fetchCounties();
  }, []);

  const handleCountyChange = async (e) => {
    const { name, value } = e.target;
    const electoral = name === 'electoralCounty';
    const constituencyName = electoral ? 'electoralConstituency' : 'constituency';
    const wardName = electoral ? 'electoralWard' : 'ward';
    const constituenciesKey = electoral ? 'electoralConstituencies' : 'constituencies';
    const wardsKey = electoral ? 'electoralWards' : 'wards';
    setFormData(prev => ({ ...prev, [name]: value, [constituencyName]: '', [wardName]: '' }));
    
    try {
      const data = await locationApi.getConstituencies(value);
      const constituenciesList = Array.isArray(data) ? data : data.results || [];
      setLocations(prev => ({ 
        ...prev, 
        [constituenciesKey]: constituenciesList,
        [wardsKey]: [],
      }));
    } catch (error) {
      console.error('Error fetching constituencies:', error);
      setLocations(prev => ({ ...prev, [constituenciesKey]: [], [wardsKey]: [] }));
    }
  };

  const handleConstituencyChange = async (e) => {
    const { name, value } = e.target;
    const electoral = name === 'electoralConstituency';
    const wardName = electoral ? 'electoralWard' : 'ward';
    const wardsKey = electoral ? 'electoralWards' : 'wards';
    setFormData(prev => ({ ...prev, [name]: value, [wardName]: '' }));
    
    if (!value) {
      setLocations(prev => ({ ...prev, [wardsKey]: [] }));
      return;
    }
    
    try {
      const data = await locationApi.getWards(value);
      const wardsList = Array.isArray(data) ? data : data.results || [];
      setLocations(prev => ({ 
        ...prev,
        [wardsKey]: wardsList,
      }));
    } catch (error) {
      console.error('Error fetching wards:', error);
      setLocations(prev => ({ ...prev, [wardsKey]: [] }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAspirantChange = (e) => {
    const { name, value } = e.target;
    setAspirantDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (file, documentType) => {
    if (!file) return;

    setUploadingFiles(prev => ({ ...prev, [documentType]: true }));

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', documentType);

      const response = await fetch(getApiEndpoint('upload_file/'), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      setDocumentUrls(prev => ({ ...prev, [documentType]: data.url }));
      return data.url;
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(`Failed to upload ${documentType}. Please try again.`);
      return null;
    } finally {
      setUploadingFiles(prev => ({ ...prev, [documentType]: false }));
    }
  };

  const handleSpecialCategoryChange = (category) => {
    setAspirantDetails(prev => {
      if (category === 'none') {
        return { ...prev, specialCategories: prev.specialCategories.includes('none') ? [] : ['none'] };
      }
      const selected = prev.specialCategories.filter(item => item !== 'none');
      return {
        ...prev,
        specialCategories: selected.includes(category)
          ? selected.filter(item => item !== category)
          : [...selected, category],
      };
    });
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setActiveStep(1);
  };

  const handleNext = () => {
    const missingFields = getMissingFieldsForStep(activeStep);
    if (missingFields.length > 0) {
      if (activeStep === 2 && !membershipReferenceIsValid) {
        setError('Membership number/reference must start with DEP.');
      } else if (activeStep === 1 && missingFields.includes('email') && formData.email) {
        setError('Enter a valid email address.');
      } else {
        setError('Please complete all required fields marked with *.');
      }
      return;
    }
    
    setActiveStep((prevStep) => prevStep + 1);
    setError('');
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setError('');

    const freeRegistration = isFreeRegistrationPeriod();
    setRegistrationIsFree(freeRegistration);
    const paymentRequired = selectedAmount > 0 && !freeRegistration;
    const missingStep = isAspirantPlan
      ? Array.from({ length: 12 }, (_, index) => index + 1)
        .find(step => getMissingFieldsForStep(step).length > 0)
      : getMissingFieldsForStep(1).length > 0 ? 1 : null;
    if (missingStep) {
      setActiveStep(missingStep);
      setError('Please complete all required fields marked with *.');
      return;
    }

    if (paymentRequired && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Enter a valid email address for Paystack checkout.');
      return;
    }

    const fullName = isAspirantPlan ? formData.fullName.trim() : `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
    const nameParts = fullName.split(/\s+/);
    const membershipData = {
      first_name: isAspirantPlan ? nameParts[0] : formData.firstName.trim(),
      last_name: isAspirantPlan ? nameParts.slice(1).join(' ') : formData.lastName.trim(),
      full_name: isAspirantPlan ? fullName : '',
      national_id_number: isAspirantPlan ? formData.nationalIdNumber.trim() : '',
      date_of_birth: isAspirantPlan ? formData.dateOfBirth : null,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      whatsapp_number: isAspirantPlan ? formData.whatsappNumber.trim() : '',
      sub_county: isAspirantPlan ? formData.subCounty.trim() : '',
      postal_address: isAspirantPlan ? formData.postalPhysicalAddress.trim() : '',
      age: isAspirantPlan ? null : formData.age,
      gender: formData.gender,
      occupation: isAspirantPlan
        ? aspirantDetails.currentOccupation.trim()
        : formData.occupation.trim(),
      county: formData.county,
      constituency: formData.constituency,
      ward: formData.ward,
      electoral_county: isAspirantPlan ? formData.electoralCounty : null,
      electoral_constituency: isAspirantPlan ? formData.electoralConstituency : null,
      electoral_ward: isAspirantPlan ? formData.electoralWard : null,
      dep_bus_membership_status: isAspirantPlan ? formData.membershipStatus : '',
      membership_status_confirmed: isAspirantPlan ? formData.membershipStatusConfirmed === 'yes' : null,
      membership_reference: isAspirantPlan ? formData.membershipReference.trim() : '',
      aspirant_details: isAspirantPlan ? aspirantDetails : {},
      membership_type: selectedPlan,
      membership_category: selectedCategory,
      // Section E: Special Category
      special_category: aspirantDetails.specialCategories.length > 0 
        ? aspirantDetails.specialCategories[0] 
        : null,
      disability_nature: aspirantDetails.disabilityDetails || '',
      // Section F: Education, Profession & Experience
      education_level: aspirantDetails.educationLevel || '',
      professional_qualifications: aspirantDetails.professionalQualifications || '',
      current_occupation: aspirantDetails.currentOccupation || '',
      current_employer: aspirantDetails.currentEmployer || '',
      professional_experience: aspirantDetails.professionalExperience || '',
      // Section G: Leadership & Community Engagement
      previous_leadership_position: aspirantDetails.heldPublicLeadership || '',
      previous_leadership_details: aspirantDetails.heldPublicLeadership === 'yes'
        ? `Position: ${aspirantDetails.previousLeadershipPosition}, Institution: ${aspirantDetails.previousLeadershipInstitution}, Period: ${aspirantDetails.previousLeadershipPeriod}`
        : '',
      organizations_participated: aspirantDetails.organisations || '',
      community_contribution: aspirantDetails.communityContribution || '',
      // Section H: Motivation for DEP-BUS Ticket
      motivation_reason: aspirantDetails.motivation || '',
      key_issues: `${aspirantDetails.priorityIssueOne}\n${aspirantDetails.priorityIssueTwo}\n${aspirantDetails.priorityIssueThree}`.trim(),
      devolution_understanding: aspirantDetails.devolutionVision || '',
      contribution_to_party: aspirantDetails.partyContribution || '',
      // Section I: Political & Electoral Information
      contested_before: aspirantDetails.contestedBefore || '',
      contested_details: aspirantDetails.contestedBefore === 'yes'
        ? `Position: ${aspirantDetails.contestedPosition}, Year: ${aspirantDetails.contestedYear}, Party: ${aspirantDetails.contestedParty}, Outcome: ${aspirantDetails.contestedOutcome}`
        : '',
      current_public_office: aspirantDetails.currentlyHoldsOffice || '',
      current_office_details: aspirantDetails.currentOfficeDetails || '',
      bankruptcy_proceedings: aspirantDetails.bankruptcyHistory || '',
      bankruptcy_details: aspirantDetails.bankruptcyDetails || '',
      criminal_proceedings: aspirantDetails.criminalProceedings || '',
      criminal_proceedings_details: aspirantDetails.criminalProceedingsDetails || '',
      // Section J: Campaign & Organisational Capacity
      support_network: aspirantDetails.supportNetwork || '',
      volunteer_count: aspirantDetails.volunteerCount ? parseInt(aspirantDetails.volunteerCount) : null,
      campaign_structure: aspirantDetails.campaignStructure || '',
      grassroots_strategy: aspirantDetails.grassrootsStrategy || '',
      // Section K: Commitment to DEP-BUS
      uphold_values: aspirantDetails.upholdPartyValues || '',
      peaceful_politics: aspirantDetails.peacefulPolitics || '',
      issue_based_politics: aspirantDetails.supportIssueBasedPolitics || '',
      abide_nomination: aspirantDetails.abideByNominationProcess || '',
      // Section M: Document Attachments (Cloudinary URLs)
      id_document: documentUrls.idDocument || '',
      passport_photo: documentUrls.passportPhoto || '',
      membership_proof: documentUrls.membershipProof || '',
      academic_certificates: documentUrls.academicCertificates || '',
      leadership_documents: documentUrls.leadershipDocuments || '',
      other_documents: documentUrls.otherDocuments || '',
    };

    if (!paymentRequired) {
      setIsSubmitting(true);
      try {
        await membershipApi.create(membershipData, false);
        setSubmitted(true);
      } catch (error) {
        console.error('Error submitting membership:', error);
        setError(error.response?.data?.detail || 'An error occurred while submitting your application. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
    if (!publicKey && !pendingPayment) {
      setError('Paystack is not configured yet. Please add the public key to the frontend environment and the secret key to the backend environment.');
      return;
    }

    const verifyPayment = async (reference) => {
      const paymentDetails = { reference, membershipData };
      setPendingPayment(paymentDetails);
      await membershipApi.verifyPaystackPayment(reference, membershipData);
      setPendingPayment(null);
      setSubmitted(true);
      setActiveStep(steps.length - 1);
      setIsSubmitting(false);
    };

    setIsSubmitting(true);
    try {
      if (pendingPayment) {
        await membershipApi.verifyPaystackPayment(
          pendingPayment.reference,
          pendingPayment.membershipData
        );
        setPendingPayment(null);
        setSubmitted(true);
        setActiveStep(steps.length - 1);
        setIsSubmitting(false);
      } else {
        const PaystackPop = await loadPaystack();
        const payment = PaystackPop.setup({
          key: publicKey,
          email: membershipData.email,
          amount: selectedAmount * 100,
          currency: 'KES',
          callback: async (response) => {
            try {
              await verifyPayment(response.reference);
            } catch (error) {
              console.error('Error verifying Paystack membership payment:', error);
              setError(error.response?.data?.detail || 'Payment was received, but could not be verified yet. Retry verification to complete your application.');
            } finally {
              setIsSubmitting(false);
            }
          },
          onClose: () => {
            setIsSubmitting(false);
          },
        });

        payment.openIframe();
      }
    } catch (error) {
      console.error('Error submitting membership payment:', error);
      setError(error.response?.data?.detail || 'Unable to start Paystack checkout. Please try again.');
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step) => {
    if (isAspirantPlan && step >= 3 && step < steps.length - 1) {
      return renderAspirantApplicationStep();
    }
    if (step === steps.length - 1) {
      return renderPaymentStep();
    }

    switch (step) {
      case 0:
        return (
          <>
            <Box sx={{
              mb: 3,
              p: { xs: 2, sm: 2.5 },
              borderRadius: 2,
              bgcolor: 'success.light',
              color: 'success.dark',
            }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                {registrationIsFree ? 'Register for free until 30 November 2026' : 'Registration is open'}
              </Typography>
              <Typography variant="body2">
                {registrationIsFree
                  ? 'Every plan is free during the registration period. From 1 December, paid plans will continue through Paystack checkout.'
                  : 'Choose a plan to see the fee and complete your application securely.'}
              </Typography>
            </Box>
            <Tabs
              value={selectedCategory}
              onChange={(_, value) => {
                setSelectedCategory(value);
                if (value === 'youth_pwd' && selectedPlan === 'mwananchi') {
                  setSelectedPlan(null);
                  setActiveStep(0);
                }
              }}
              aria-label="Membership pricing categories"
              sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
            >
              {membershipCategories.map((category) => (
                <Tab key={category.id} value={category.id} label={category.label} />
              ))}
            </Tabs>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {membershipPlans
                .filter((plan) => selectedCategory === 'general' || plan.youthAmount !== null)
                .map((plan) => {
                  const amount = getMembershipAmount(plan, selectedCategory);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={plan.id}>
                      <MembershipCard
                        component="div"
                        role="button"
                        tabIndex={0}
                        aria-pressed={selectedPlan === plan.id}
                        selected={selectedPlan === plan.id}
                        onClick={() => handlePlanSelect(plan.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handlePlanSelect(plan.id);
                          }
                        }}
                        aria-label={`Choose ${plan.title} membership`}
                        sx={{
                          width: '100%',
                          textAlign: 'left',
                          bgcolor: selectedPlan === plan.id ? 'rgba(46, 139, 87, 0.06)' : 'background.paper',
                        }}
                      >
                        <CardContent sx={{
                          p: { xs: 2.5, sm: 3 },
                          display: 'flex',
                          flexDirection: 'column',
                          minHeight: 285,
                          height: '100%',
                        }}>
                          <Typography variant="h5" component="h2" sx={{ color: 'primary.dark', fontWeight: 800 }}>
                            {plan.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: 48 }}>
                            {plan.description}
                          </Typography>
                          <Box sx={{ my: 2 }}>
                            {registrationIsFree ? (
                              <>
                                <Chip size="small" color="success" label="FREE REGISTRATION" sx={{ mb: 0.75, fontWeight: 800 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {amount === 0 ? 'Mwananchi membership remains free' : `KES ${amount.toLocaleString('en-KE')} from 1 December`}
                                </Typography>
                              </>
                            ) : (
                              <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 800 }}>
                                {amount === 0 ? 'Always free' : `KES ${amount.toLocaleString('en-KE')}`}
                              </Typography>
                            )}
                          </Box>
                          <Box sx={{ mt: 'auto' }}>
                            {plan.features.map((feature) => (
                              <Box key={feature} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                <CheckCircleOutlineIcon sx={{ mr: 1, mt: '2px', color: 'primary.main', fontSize: 19 }} />
                                <Typography variant="body2" color="text.secondary">{feature}</Typography>
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </MembershipCard>
                    </Grid>
                  );
                })}
            </Grid>
          </>
        );
      case 1:
        return renderPersonalInfoStep();
      case 2:
        return isAspirantPlan ? renderMembershipDetailsStep() : null;
      default:
        return null;
    }
  };

  const renderPersonalInfoStep = () => (
    <Grid container spacing={3}>
      {isAspirantPlan ? (
        <>
          <Grid item xs={12}>
            {formSectionHeading('Section A · Personal details', 'aspirant-section-1')}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Full name as appearing on National ID"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={Boolean(error) && !formData.fullName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="National ID / Passport number"
              name="nationalIdNumber"
              value={formData.nationalIdNumber}
              onChange={handleChange}
              error={Boolean(error) && !formData.nationalIdNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Date of birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={Boolean(error) && !formData.dateOfBirth}
            />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!formData.firstName && error}
              helperText={!formData.firstName && error ? 'First name is required' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!formData.lastName && error}
              helperText={!formData.lastName && error ? 'Last name is required' : ''}
            />
          </Grid>
        </>
      )}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          error={Boolean(error) && (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))}
          helperText={!formData.email
            ? 'Email address is required'
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
              ? 'Enter a valid email address'
              : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label={isAspirantPlan ? 'Telephone number' : 'Phone Number'}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={!formData.phone && error}
          helperText={!formData.phone && error ? 'Phone number is required' : ''}
        />
      </Grid>
      {isAspirantPlan && (
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="WhatsApp number"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            error={Boolean(error) && !formData.whatsappNumber}
          />
        </Grid>
      )}
      {!isAspirantPlan && (
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          error={!formData.age && error}
          helperText={!formData.age && error ? 'Age is required' : ''}
        />
      </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required error={!formData.gender && error}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {!formData.gender && error && (
            <FormHelperText>Gender is required</FormHelperText>
          )}
        </FormControl>
      </Grid>
      {!isAspirantPlan && (
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          error={!formData.occupation && error}
          helperText={!formData.occupation && error ? 'Occupation is required' : ''}
        />
      </Grid>
      )}
      <Grid item xs={12}>
        <FormControl fullWidth required error={!formData.county && error}>
          <InputLabel id="county-label">County</InputLabel>
          <Select
            labelId="county-label"
            name="county"
            value={formData.county}
            onChange={handleCountyChange}
            label="County"
          >
            <MenuItem value="">Select a County</MenuItem>
            {locations.counties && locations.counties.map((county) => (
              <MenuItem key={county.id} value={county.id}>
                {county.name}
              </MenuItem>
            ))}
          </Select>
          {!formData.county && error && (
            <FormHelperText>County is required</FormHelperText>
          )}
        </FormControl>
      </Grid>
      {isAspirantPlan && (
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Postal / physical address"
            name="postalPhysicalAddress"
            value={formData.postalPhysicalAddress}
            onChange={handleChange}
          />
        </Grid>
      )}
      {isAspirantPlan && (
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Sub-County"
            name="subCounty"
            value={formData.subCounty}
            onChange={handleChange}
            helperText="Enter your Sub-County"
            error={Boolean(error) && !formData.subCounty}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required error={!formData.constituency && error} disabled={!formData.county}>
          <InputLabel id="constituency-label">Constituency</InputLabel>
          <Select
            labelId="constituency-label"
            name="constituency"
            value={formData.constituency}
            onChange={handleConstituencyChange}
            label="Constituency"
          >
            <MenuItem value="">Select a Constituency</MenuItem>
            {locations.constituencies && locations.constituencies.map((constituency) => (
              <MenuItem key={constituency.id} value={constituency.id}>
                {constituency.name}
              </MenuItem>
            ))}
          </Select>
          {!formData.constituency && error && (
            <FormHelperText>Constituency is required</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required error={!formData.ward && error} disabled={!formData.constituency}>
          <InputLabel id="ward-label">Ward</InputLabel>
          <Select
            labelId="ward-label"
            name="ward"
            value={formData.ward}
            onChange={handleChange}
            label="Ward"
          >
            <MenuItem value="">Select a Ward</MenuItem>
            {locations.wards && locations.wards.map((ward) => (
              <MenuItem key={ward.id} value={ward.id}>
                {ward.name}
              </MenuItem>
            ))}
          </Select>
          {!formData.ward && error && (
            <FormHelperText>Ward is required</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 2 }}>
          * Fields marked with an asterisk are required
        </Typography>
      </Grid>
    </Grid>
  );

  const renderMembershipDetailsStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {formSectionHeading('Section B · DEP-BUS membership', 'aspirant-section-2')}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Confirm your membership status and provide your membership number before continuing.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component="fieldset" required error={Boolean(error) && !formData.membershipStatus}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Are you currently a member of DEP-BUS? <span style={{ color: '#c62828' }}>*</span>
          </Typography>
          <RadioGroup row name="membershipStatus" value={formData.membershipStatus} onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="not_sure" control={<Radio />} label="Not sure" />
          </RadioGroup>
          {Boolean(error) && !formData.membershipStatus && <FormHelperText>This answer is required</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component="fieldset" required error={Boolean(error) && !formData.membershipStatusConfirmed}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Have you confirmed your membership status using USSD code *509#? <span style={{ color: '#c62828' }}>*</span>
          </Typography>
          <RadioGroup row name="membershipStatusConfirmed" value={formData.membershipStatusConfirmed} onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          {Boolean(error) && !formData.membershipStatusConfirmed && <FormHelperText>This answer is required</FormHelperText>}
        </FormControl>
      </Grid>
      {(formData.membershipStatus === 'no'
        || formData.membershipStatus === 'not_sure'
        || formData.membershipStatusConfirmed === 'no') && (
        <Grid item xs={12}>
          <Alert severity="info">
            All Aspirants are advised to reconfirm their DEP-BUS membership status through USSD Code *509# (dial *509# and follow the prompts), then enter their membership number/reference below.
          </Alert>
        </Grid>
      )}
      <Grid item xs={12} sm={8}>
        <TextField
          required
          fullWidth
          label="DEP-BUS membership number / reference"
          name="membershipReference"
          value={formData.membershipReference}
          onChange={handleChange}
          placeholder="DEP123456"
          error={Boolean(formData.membershipReference.trim()) && !membershipReferenceIsValid}
          helperText={!formData.membershipReference.trim()
            ? 'Required. Your membership number/reference must start with DEP.'
            : !membershipReferenceIsValid
              ? 'Enter a valid membership number/reference starting with DEP.'
              : 'Membership number/reference accepted.'}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" color="error">* Fields marked with an asterisk are required</Typography>
      </Grid>
    </Grid>
  );

  const aspirantTextField = (name, label, options = {}) => (
    <Grid item xs={12} sm={options.half ? 6 : 12}>
      <TextField
        required
        fullWidth
        name={name}
        label={label}
        value={aspirantDetails[name]}
        onChange={handleAspirantChange}
        multiline={Boolean(options.multiline)}
        minRows={options.multiline ? (options.rows || 3) : undefined}
        type={options.type || 'text'}
        inputProps={options.type === 'number' ? { min: 0 } : undefined}
        error={Boolean(error) && !String(aspirantDetails[name] || '').trim()}
        helperText={Boolean(error) && !String(aspirantDetails[name] || '').trim() ? 'This field is required' : ''}
      />
    </Grid>
  );

  const aspirantYesNoField = (name, label, choices = ['Yes', 'No']) => (
    <Grid item xs={12}>
      <FormControl component="fieldset" required error={Boolean(error) && !aspirantDetails[name]}>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {label} <span style={{ color: '#c62828' }}>*</span>
        </Typography>
        <RadioGroup row name={name} value={aspirantDetails[name]} onChange={handleAspirantChange}>
          {choices.map((choice) => {
            const value = choice === 'In Development' ? 'in_development' : choice.toLowerCase();
            return <FormControlLabel key={value} value={value} control={<Radio />} label={choice} />;
          })}
        </RadioGroup>
        {Boolean(error) && !aspirantDetails[name] && <FormHelperText>This answer is required</FormHelperText>}
      </FormControl>
    </Grid>
  );

  const formSectionHeading = (title, headingId) => {
    const [, letter, heading] = title.match(/^Section ([A-M]) · (.+)$/) || [];

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, mb: 3 }}>
        <Box
          aria-hidden="true"
          sx={{
            display: 'grid',
            placeItems: 'center',
            width: 42,
            height: 42,
            flexShrink: 0,
            borderRadius: 1,
            bgcolor: 'success.dark',
            color: 'common.white',
            fontSize: '1rem',
            fontWeight: 800,
          }}
        >
          {letter}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="overline" sx={{ color: 'success.dark', fontWeight: 800, lineHeight: 1.4 }}>
            APPLICATION SECTION
          </Typography>
          <Typography
            id={headingId}
            variant="h5"
            component="h2"
            sx={{ color: 'primary.dark', fontWeight: 800, lineHeight: 1.25 }}
          >
            {heading || title}
          </Typography>
        </Box>
      </Box>
    );
  };

  const sectionPage = (step, title, children) => {
    const headingId = `aspirant-section-${step}`;

    return activeStep === step ? (
      <Box
        key={title}
        component="section"
        aria-labelledby={headingId}
        sx={{
          py: { xs: 0.5, sm: 1 },
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
            bgcolor: 'common.white',
          },
          '& .MuiRadioGroup-root, & .MuiFormGroup-root': {
            flexWrap: 'wrap',
            gap: 1,
            mt: 1,
          },
          '& .MuiFormControlLabel-root': {
            m: 0,
            minHeight: 44,
            px: 1.25,
            py: 0.25,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'common.white',
            transition: 'border-color 160ms ease, background-color 160ms ease',
            '&:hover': {
              borderColor: 'success.main',
              bgcolor: 'rgba(23, 79, 54, 0.035)',
            },
          },
        }}
      >
        {formSectionHeading(title, headingId)}
        <Grid container spacing={{ xs: 2, sm: 2.5 }}>{children}</Grid>
      </Box>
    ) : null;
  };

  const renderAspirantApplicationStep = () => {
    const electionAreaSelect = (field, label, options, disabled, onChange) => (
      <Grid item xs={12} md={4}>
        <FormControl fullWidth required error={Boolean(error) && !formData[field]}>
          <InputLabel id={`${field}-label`}>{label}</InputLabel>
          <Select
            labelId={`${field}-label`}
            name={field}
            value={formData[field]}
            onChange={onChange}
            label={label}
            disabled={disabled}
          >
            <MenuItem value="">Select {label}</MenuItem>
            {options.map((item) => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          {Boolean(error) && !formData[field] && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
      </Grid>
    );

    return (
      <Box>
        {activeStep === 3 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            This position is pre-filled from your selected membership plan.
          </Alert>
        )}
        {sectionPage(3, 'Section C · Position applied for', (
          <>
            <Grid item xs={12}>
              <Typography variant="body2">
                Position to contest on a DEP-BUS ticket in the 10 August 2027 General Election
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Position applied for"
                value={selectedPlanDetails?.position}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </>
        ))}

        {sectionPage(4, 'Section D · Electoral area', (
          <>
            {electionAreaSelect(
              'electoralCounty',
              'Electoral county',
              locations.counties,
              false,
              handleCountyChange
            )}
            {electionAreaSelect(
              'electoralConstituency',
              'Electoral constituency',
              locations.electoralConstituencies,
              !formData.electoralCounty,
              handleConstituencyChange
            )}
            {electionAreaSelect(
              'electoralWard',
              'Electoral ward',
              locations.electoralWards,
              !formData.electoralConstituency,
              handleChange
            )}
          </>
        ))}

        {sectionPage(5, 'Section E · Special category', (
          <>
            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                required
                error={Boolean(error) && !aspirantDetails.specialCategories.length}
              >
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Do you belong to any of the following categories? <span style={{ color: '#c62828' }}>*</span>
                </Typography>
              <FormGroup row>
                {[
                  ['woman', 'Woman'],
                  ['youth', 'Youth'],
                  ['pwd', 'Person with Disability (PWD)'],
                  ['none', 'None of the above'],
                ].map(([value, label]) => (
                  <FormControlLabel
                    key={value}
                    control={(
                      <Checkbox
                        checked={aspirantDetails.specialCategories.includes(value)}
                        onChange={() => handleSpecialCategoryChange(value)}
                      />
                    )}
                    label={label}
                  />
                ))}
              </FormGroup>
                {Boolean(error) && !aspirantDetails.specialCategories.length
                  && <FormHelperText>Select at least one category.</FormHelperText>}
              </FormControl>
            </Grid>
            {aspirantDetails.specialCategories.includes('pwd')
              && aspirantTextField('disabilityDetails', 'Nature of disability', { multiline: true })}
          </>
        ))}

        {sectionPage(6, 'Section F · Education, profession & experience', (
          <>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                    <InputLabel required>Highest level of education</InputLabel>
                <Select
                      required
                  name="educationLevel"
                  value={aspirantDetails.educationLevel}
                  onChange={handleAspirantChange}
                  label="Highest level of education"
                >
                  {['Primary', 'Secondary', 'Certificate', 'Diploma', 'Degree', 'Postgraduate', 'Other'].map((level) => (
                    <MenuItem key={level} value={level.toLowerCase()}>{level}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {aspirantDetails.educationLevel === 'other'
              && aspirantTextField('educationOther', 'Other education level', { half: true })}
            {aspirantTextField('professionalQualifications', 'Professional qualification(s)', { half: true })}
            {aspirantTextField('currentOccupation', 'Current occupation / profession / business', { half: true })}
            {aspirantTextField('currentEmployer', 'Current employer / organisation / business (if applicable)', { half: true })}
            {aspirantTextField('professionalExperience', 'Professional, leadership, community or public-service experience', { multiline: true })}
          </>
        ))}

        {sectionPage(7, 'Section G · Leadership & community engagement', (
          <>
            {aspirantYesNoField('heldPublicLeadership', 'Have you previously held an elected or appointed public leadership position?')}
            {aspirantDetails.heldPublicLeadership === 'yes' && (
              <>
                {aspirantTextField('previousLeadershipPosition', 'Position held', { half: true })}
                {aspirantTextField('previousLeadershipInstitution', 'Institution / area', { half: true })}
                {aspirantTextField('previousLeadershipPeriod', 'Period', { half: true })}
              </>
            )}
            {aspirantTextField('organisations', 'Leadership, community, professional, youth, women, religious or civic organisations you have participated in', { multiline: true })}
            {aspirantTextField('communityContribution', 'Your contribution to the development of your community', { multiline: true })}
          </>
        ))}

        {sectionPage(8, 'Section H · Motivation for seeking the DEP-BUS ticket', (
          <>
            {aspirantTextField('motivation', 'Why do you wish to contest the 2027 General Election on a DEP-BUS ticket?', { multiline: true })}
            {aspirantTextField('priorityIssueOne', 'Most important issue 1', { multiline: true })}
            {aspirantTextField('priorityIssueTwo', 'Most important issue 2', { multiline: true })}
            {aspirantTextField('priorityIssueThree', 'Most important issue 3', { multiline: true })}
            {aspirantTextField('devolutionVision', 'What does devolution mean to you and how would you strengthen it?', { multiline: true })}
            {aspirantTextField('partyContribution', 'What would you bring to DEP-BUS and the people of your electoral area?', { multiline: true })}
          </>
        ))}

        {sectionPage(9, 'Section I · Political & electoral information', (
          <>
            {aspirantYesNoField('contestedBefore', 'Have you ever contested an elective position before?')}
            {aspirantDetails.contestedBefore === 'yes' && (
              <>
                {aspirantTextField('contestedPosition', 'Position', { half: true })}
                {aspirantTextField('contestedYear', 'Year', { half: true })}
                {aspirantTextField('contestedParty', 'Party', { half: true })}
                {aspirantTextField('contestedOutcome', 'Outcome', { half: true })}
              </>
            )}
            {aspirantYesNoField('currentlyHoldsOffice', 'Are you currently holding any elected public office?')}
            {aspirantDetails.currentlyHoldsOffice === 'yes'
              && aspirantTextField('currentOfficeDetails', 'Please specify your current office', { multiline: true })}
            {aspirantYesNoField('bankruptcyHistory', 'Have you ever been declared bankrupt or been involved in bankruptcy or insolvency proceedings?')}
            {aspirantDetails.bankruptcyHistory === 'yes'
              && aspirantTextField('bankruptcyDetails', 'Please provide details', { multiline: true })}
            {aspirantYesNoField('criminalProceedings', 'Are you currently facing any criminal proceedings?')}
            {aspirantDetails.criminalProceedings === 'yes'
              && aspirantTextField('criminalProceedingsDetails', 'Please provide details', { multiline: true })}
          </>
        ))}

        {sectionPage(10, 'Section J · Campaign & organisational capacity', (
          <>
            {aspirantTextField('supportNetwork', 'Describe your support / network within your electoral area', { multiline: true })}
            {aspirantTextField('volunteerCount', 'Estimated number of volunteers / supporters', { half: true, type: 'number' })}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel required>Existing campaign / grassroots mobilisation structure</InputLabel>
                <Select
                  required
                  name="campaignStructure"
                  value={aspirantDetails.campaignStructure}
                  onChange={handleAspirantChange}
                  label="Existing campaign / grassroots mobilisation structure"
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                  <MenuItem value="in_development">In Development</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {aspirantTextField('grassrootsStrategy', 'Describe your proposed grassroots organisation strategy', { multiline: true })}
          </>
        ))}

        {sectionPage(11, 'Section K · Commitment to DEP-BUS', (
          <>
            {aspirantYesNoField('upholdPartyValues', 'Are you willing to uphold the values, constitution, policies, rules and decisions of DEP-BUS?')}
            {aspirantYesNoField('peacefulPolitics', 'Will you conduct your political activities peacefully and respectfully, avoiding violence, hate speech, personal attacks and incitement?')}
            {aspirantYesNoField('supportIssueBasedPolitics', 'Will you support peaceful, issue-based politics focused on unity, devolution and development?')}
            {aspirantYesNoField('abideByNominationProcess', 'Will you abide by the Party’s nomination procedures and decisions of the relevant Party organs?')}
          </>
        ))}
        {sectionPage(12, 'Section M · Document attachments', (
          <>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Please attach/upload copies of the following documents where applicable. Files are uploaded securely to Cloudinary.
              </Typography>
            </Grid>
            {[
              { key: 'idDocument', label: 'National ID / Passport', required: true },
              { key: 'passportPhoto', label: 'Passport-size photograph', required: true },
              { key: 'membershipProof', label: 'Proof of DEP-BUS membership', required: true },
              { key: 'academicCertificates', label: 'Academic / Professional certificates', required: true, multiple: true },
              { key: 'leadershipDocuments', label: 'Leadership / Public service documentation', required: true, multiple: true },
              { key: 'otherDocuments', label: 'Other supporting documents', required: true, multiple: true },
            ].map(({ key, label, required, multiple }) => (
              <Grid item xs={12} sm={6} key={key}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                    {label} {required && <span style={{ color: 'red' }}>*</span>}
                  </Typography>
                  <input
                    type="file"
                    accept={multiple ? 'image/*,.pdf' : 'image/*,.pdf'}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleFileUpload(file, key);
                      }
                    }}
                    disabled={uploadingFiles[key]}
                    style={{ display: 'none' }}
                    id={`file-${key}`}
                  />
                  <label htmlFor={`file-${key}`}>
                    <Button
                      variant="outlined"
                      component="span"
                      disabled={uploadingFiles[key]}
                      fullWidth
                      sx={{ mb: 1 }}
                    >
                      {uploadingFiles[key] ? 'Uploading...' : `Choose ${multiple ? 'files' : 'file'}`}
                    </Button>
                  </label>
                  {documentUrls[key] && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="success.main">
                        ✓ File uploaded successfully
                      </Typography>
                      <Typography
                        variant="caption"
                        component="a"
                        href={documentUrls[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ ml: 1, color: 'primary.main', textDecoration: 'underline' }}
                      >
                        View
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mt: 2 }}>
                Maximum file size: 10MB. Accepted formats: Images (JPG, PNG) and PDF.
              </Alert>
            </Grid>
          </>
        ))}
      </Box>
    );
  };

  const renderPaymentStep = () => {
    if (!requiresPayment) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.dark', fontWeight: 800 }}>
            No Payment Required
          </Typography>
          <Typography variant="body1">
            {selectedAmount === 0
              ? 'Mwananchi membership is free. Submit your application to join.'
              : 'Your registration is free through 30 November 2026. Submit your application to join now.'}
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ maxWidth: 560, mx: 'auto', py: { xs: 1, sm: 2 } }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'primary.dark', fontWeight: 700 }}>
          Complete your membership payment
        </Typography>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, bgcolor: 'background.default' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 1 }}>
            <Typography color="text.secondary">Membership plan</Typography>
            <Typography fontWeight={600}>{selectedPlanDetails?.title}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 1 }}>
            <Typography color="text.secondary">Membership category</Typography>
            <Typography fontWeight={600}>
              {membershipCategories.find(({ id }) => id === selectedCategory)?.label}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Typography color="text.secondary">Amount due</Typography>
            <Typography fontWeight={700} color="primary.main">
              KES {selectedAmount.toLocaleString('en-KE')}
            </Typography>
          </Box>
        </Paper>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Continue to Paystack to complete your payment securely. Your membership application will be submitted after the payment is verified.
        </Typography>
      </Box>
    );
  };

  return (
    <Box>
      <PageHero
        tag="Join us"
        title="Become a member"
        subtitle="Join a growing movement focused on service, unity, and meaningful national progress."
        image="/images/handss.jpg"
      />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {isAspirantPlan && activeStep > 0 ? (
          <Paper
            variant="outlined"
            sx={{
              mb: { xs: 2, sm: 4 },
              p: { xs: 2, sm: 2.5 },
              borderRadius: 3,
              borderColor: 'rgba(0, 100, 0, 0.16)',
              background: 'linear-gradient(135deg, rgba(0, 100, 0, 0.045), rgba(255,255,255,0.98) 62%)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box>
                <Typography
                  variant="overline"
                  sx={{ color: 'success.dark', fontWeight: 800, letterSpacing: 1.2, lineHeight: 1.5 }}
                >
                  Aspirant application
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.dark', fontWeight: 800 }}>
                  {isAspirantPaymentStep
                    ? 'Application sections complete'
                    : `Section ${currentSectionLetter} of ${aspirantSectionTitles.length}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isAspirantPaymentStep
                    ? 'Your application is ready for the final step.'
                    : aspirantSectionTitles[aspirantSectionIndex].replace(/^Section [A-K] · /, '')}
                </Typography>
              </Box>
              <Chip
                label={isAspirantPaymentStep
                  ? `${aspirantSectionTitles.length} / ${aspirantSectionTitles.length}`
                  : `${activeStep} / ${aspirantSectionTitles.length}`}
                color="success"
                variant="outlined"
                sx={{ fontWeight: 800, flexShrink: 0 }}
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={sectionProgress}
              aria-label="Application section progress"
              sx={{
                height: 5,
                mb: 2,
                borderRadius: 5,
                bgcolor: 'rgba(0, 100, 0, 0.1)',
                '& .MuiLinearProgress-bar': { borderRadius: 5, bgcolor: 'success.dark' },
              }}
            />
            <Box
              ref={stepperContainerRef}
              sx={{
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': { height: 5 },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: 5,
                  bgcolor: 'rgba(0, 100, 0, 0.25)',
                },
              }}
            >
              <Box
                role="list"
                aria-label="Application sections"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: { xs: 590, sm: '100%' },
                  maxWidth: 1100,
                  mx: 'auto',
                  py: 0.5,
                }}
              >
                {aspirantSectionTitles.map((title, index) => {
                  const letter = String.fromCharCode(65 + index);
                  const isCurrent = !isAspirantPaymentStep && index === aspirantSectionIndex;
                  const isComplete = isAspirantPaymentStep || index < aspirantSectionIndex;
                  return (
                    <React.Fragment key={title}>
                      <Box
                        role="listitem"
                        aria-label={`${title}${isCurrent ? ', current section' : isComplete ? ', completed' : ''}`}
                        title={title}
                        sx={{ display: 'flex', justifyContent: 'center', flex: '0 0 38px' }}
                      >
                        <Box
                          ref={isCurrent || (isAspirantPaymentStep && index === aspirantSectionTitles.length - 1)
                            ? activeStepRef
                            : undefined}
                          aria-current={isCurrent ? 'step' : undefined}
                          sx={{
                            display: 'grid',
                            placeItems: 'center',
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            border: '2px solid',
                            borderColor: isCurrent || isComplete ? 'success.dark' : 'grey.300',
                            bgcolor: isCurrent ? 'success.dark' : isComplete ? 'success.main' : 'background.paper',
                            color: isCurrent || isComplete ? 'common.white' : 'text.secondary',
                            fontSize: '0.875rem',
                            fontWeight: 800,
                            boxShadow: isCurrent ? '0 0 0 4px rgba(0, 100, 0, 0.12)' : 'none',
                            transition: 'all 180ms ease',
                          }}
                        >
                          {letter}
                        </Box>
                      </Box>
                      {index < aspirantSectionTitles.length - 1 && (
                        <Box
                          aria-hidden="true"
                          sx={{
                            flex: '1 0 12px',
                            height: 2,
                            bgcolor: index < aspirantSectionIndex || isAspirantPaymentStep
                              ? 'success.main'
                              : 'grey.300',
                            transition: 'background-color 180ms ease',
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </Box>
            </Box>
          </Paper>
        ) : (
          <Stepper
            activeStep={activeStep}
            sx={{
              mb: { xs: 2, sm: 4 },
              '& .MuiStepLabel-label': {
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        <StyledPaper>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {submitted ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Your membership application is complete. Thank you for joining us.
            </Alert>
          ) : (
            <>
              {renderStepContent(activeStep)}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: { xs: 2, sm: 4 },
                pt: { xs: 2, sm: 2.5 },
                borderTop: '1px solid #dce3dc',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 0 },
              }}>
                <Button
                  disabled={activeStep === 0 || isSubmitting || Boolean(pendingPayment)}
                  onClick={handleBack}
                  sx={{ 
                    mr: { xs: 0, sm: 1 },
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  disabled={(activeStep === 0 && !selectedPlan)
                    || (isAspirantPlan && activeStep === 2 && currentStepIncomplete)
                    || isSubmitting
                    || submitted}
                  sx={{
                    backgroundColor: '#006400',
                    '&:hover': {
                      backgroundColor: '#004d00',
                    },
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  {isSubmitting
                    ? 'Processing…'
                    : activeStep !== steps.length - 1
                      ? activeStep > 0 && activeStep < steps.length - 1
                        ? `Next: ${steps[activeStep + 1].split(' · ')[0]}`
                        : 'Next'
                      : !requiresPayment
                        ? 'Submit Application'
                        : pendingPayment
                          ? 'Verify Payment'
                          : `Pay KES ${selectedAmount.toLocaleString('en-KE')} with Paystack`}
                </Button>
              </Box>
            </>
          )}
        </StyledPaper>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Need help choosing a plan?
          </Typography>
          <Button
            component="a"
            href="https://wa.me/254724253622"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            color="success"
          >
            WhatsApp us on 0724253622
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default JoinUs; 